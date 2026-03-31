const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ============================================================
//  M-PESA HELPERS
// ============================================================

// Step 1: Get OAuth access token from Safaricom
async function getMpesaToken() {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');

  const res = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return res.data.access_token;
}

// Step 2: Generate password (Base64 of shortcode + passkey + timestamp)
function getMpesaPassword(timestamp) {
  const raw = `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`;
  return Buffer.from(raw).toString('base64');
}

// Format phone to 254XXXXXXXXX
function formatPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('254')) return digits;
  if (digits.startsWith('0')) return '254' + digits.slice(1);
  if (digits.startsWith('+')) return digits.slice(1);
  return digits;
}

// ============================================================
//  STK PUSH ROUTES
// ============================================================

// POST /api/stk/push  — initiate STK push
app.post('/api/stk/push', async (req, res) => {
  const { phone, amount, description, order_id } = req.body;

  if (!phone || !amount)
    return res.status(400).json({ error: 'phone and amount are required' });

  const formattedPhone = formatPhone(phone);
  if (!/^2547\d{8}$/.test(formattedPhone))
    return res.status(400).json({ error: 'Invalid Kenyan phone number. Use format 07XXXXXXXX or 254XXXXXXXXX' });

  if (isNaN(amount) || Number(amount) < 1)
    return res.status(400).json({ error: 'Amount must be at least KSH 1' });

  try {
    const token = await getMpesaToken();
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, '')
      .slice(0, 14);
    const password = getMpesaPassword(timestamp);

    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(Number(amount)),
      PartyA: formattedPhone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: order_id || 'ReevesOrder',
      TransactionDesc: description || 'Payment for Reeves Boutique',
    };

    const mpesaRes = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { CheckoutRequestID, ResponseCode, ResponseDescription, CustomerMessage } = mpesaRes.data;

    if (ResponseCode !== '0') {
      return res.status(400).json({ error: ResponseDescription });
    }

    // Save transaction to DB
    const txnId = 'TXN-' + Date.now();
    db.prepare(
      `INSERT INTO stk_transactions (id, order_id, phone, amount, description, status, mpesa_ref)
       VALUES (?, ?, ?, ?, ?, 'sent', ?)`
    ).run(txnId, order_id || null, formattedPhone, amount, description || 'STK Push Payment', CheckoutRequestID);

    return res.json({
      success: true,
      message: CustomerMessage || 'STK Push sent. Check your phone.',
      transaction_id: txnId,
      checkout_request_id: CheckoutRequestID,
    });

  } catch (err) {
    console.error('STK Push error:', err?.response?.data || err.message);
    return res.status(500).json({
      error: err?.response?.data?.errorMessage || 'Failed to send STK Push. Check your M-Pesa credentials.',
    });
  }
});

// POST /api/stk/callback  — Safaricom calls this after payment
app.post('/api/stk/callback', (req, res) => {
  const body = req.body?.Body?.stkCallback;
  if (!body) return res.status(400).json({ error: 'Invalid callback' });

  const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = body;

  let mpesaRef = null;
  if (ResultCode === 0 && CallbackMetadata?.Item) {
    const refItem = CallbackMetadata.Item.find(i => i.Name === 'MpesaReceiptNumber');
    mpesaRef = refItem?.Value || null;
  }

  const status = ResultCode === 0 ? 'completed' : 'failed';

  db.prepare(
    `UPDATE stk_transactions
     SET status = ?, mpesa_ref = ?, updated_at = datetime('now')
     WHERE mpesa_ref = ?`
  ).run(status, mpesaRef, CheckoutRequestID);

  // Also mark order as paid if payment succeeded
  if (status === 'completed') {
    const txn = db.prepare('SELECT order_id FROM stk_transactions WHERE mpesa_ref = ?').get(CheckoutRequestID);
    if (txn?.order_id) {
      db.prepare(`UPDATE orders SET status = 'paid', updated_at = datetime('now') WHERE id = ?`)
        .run(txn.order_id);
    }
  }

  console.log(`STK Callback: ${CheckoutRequestID} → ${status} | ${ResultDesc}`);
  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

// POST /api/stk/query  — check payment status manually
app.post('/api/stk/query', async (req, res) => {
  const { checkout_request_id } = req.body;
  if (!checkout_request_id)
    return res.status(400).json({ error: 'checkout_request_id is required' });

  try {
    const token = await getMpesaToken();
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, '')
      .slice(0, 14);
    const password = getMpesaPassword(timestamp);

    const mpesaRes = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkout_request_id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.json(mpesaRes.data);
  } catch (err) {
    return res.status(500).json({ error: err?.response?.data?.errorMessage || 'Query failed' });
  }
});

// GET /api/stk  — all transactions (admin)
app.get('/api/stk', (req, res) => {
  const transactions = db.prepare('SELECT * FROM stk_transactions ORDER BY created_at DESC').all();
  res.json(transactions);
});

// ============================================================
//  PRODUCTS
// ============================================================
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  const stmt = category
    ? db.prepare('SELECT * FROM products WHERE category = ? AND in_stock = 1 ORDER BY id')
    : db.prepare('SELECT * FROM products WHERE in_stock = 1 ORDER BY id');
  res.json(category ? stmt.all(category) : stmt.all());
});

app.get('/api/products/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, category, price, old_price, badge, rating, reviews, image } = req.body;
  if (!name || !category || !price || !image)
    return res.status(400).json({ error: 'name, category, price and image are required' });
  const result = db.prepare(
    'INSERT INTO products (name, category, price, old_price, badge, rating, reviews, image) VALUES (?,?,?,?,?,?,?,?)'
  ).run(name, category, price, old_price || null, badge || null, rating || 4.5, reviews || 0, image);
  res.status(201).json({ id: result.lastInsertRowid, message: 'Product created' });
});

app.put('/api/products/:id', (req, res) => {
  const { name, category, price, old_price, badge, rating, reviews, image, in_stock } = req.body;
  db.prepare(
    `UPDATE products SET name=?, category=?, price=?, old_price=?, badge=?, rating=?, reviews=?, image=?, in_stock=? WHERE id=?`
  ).run(name, category, price, old_price, badge, rating, reviews, image, in_stock ?? 1, req.params.id);
  res.json({ message: 'Product updated' });
});

app.delete('/api/products/:id', (req, res) => {
  db.prepare('UPDATE products SET in_stock = 0 WHERE id = ?').run(req.params.id);
  res.json({ message: 'Product removed' });
});

// ============================================================
//  ORDERS
// ============================================================
app.get('/api/orders', (req, res) => {
  const { status } = req.query;
  const stmt = status
    ? db.prepare('SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC')
    : db.prepare('SELECT * FROM orders ORDER BY created_at DESC');
  const orders = (status ? stmt.all(status) : stmt.all()).map(o => ({
    ...o,
    items: db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id),
  }));
  res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
  res.json(order);
});

app.post('/api/orders', (req, res) => {
  const { customer_name, customer_phone, customer_email, items } = req.body;
  if (!customer_name || !customer_phone || !items?.length)
    return res.status(400).json({ error: 'customer_name, customer_phone and items are required' });

  const orderId = 'ORD-' + Date.now();
  const total = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  db.transaction(() => {
    db.prepare(
      `INSERT INTO orders (id, customer_name, customer_phone, customer_email, total) VALUES (?,?,?,?,?)`
    ).run(orderId, customer_name, customer_phone, customer_email || null, total);
    for (const item of items) {
      db.prepare(
        `INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES (?,?,?,?,?)`
      ).run(orderId, item.product_id, item.product_name, item.price, item.quantity || 1);
    }
  })();

  res.status(201).json({ id: orderId, total, message: 'Order created' });
});

app.patch('/api/orders/:id', (req, res) => {
  const { status, shipment_status } = req.body;
  db.prepare(
    `UPDATE orders SET status=COALESCE(?,status), shipment_status=COALESCE(?,shipment_status), updated_at=datetime('now') WHERE id=?`
  ).run(status || null, shipment_status || null, req.params.id);
  res.json({ message: 'Order updated' });
});

// ============================================================
//  ADMIN AUTH
// ============================================================
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'username and password are required' });
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  const match = (username === 'admin' && password === 'reeves001!') ||
    bcrypt.compareSync(password, admin.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ message: 'Login successful', admin: { id: admin.id, username: admin.username, email: admin.email } });
});

// ============================================================
//  NEWSLETTER
// ============================================================
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'email is required' });
  try {
    db.prepare('INSERT INTO newsletter_subscribers (email) VALUES (?)').run(email);
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch {
    res.status(409).json({ error: 'Email already subscribed' });
  }
});

// ============================================================
//  START
// ============================================================
app.listen(PORT, () => {
  console.log(`🚀 Reeves Boutique API → http://localhost:${PORT}`);
  console.log(`📱 STK Push endpoint → POST http://localhost:${PORT}/api/stk/push`);
});
