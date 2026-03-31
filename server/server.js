const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ============================================================
//  PRODUCTS
// ============================================================

// GET all products (optional ?category=Women's Fashion)
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  const stmt = category
    ? db.prepare('SELECT * FROM products WHERE category = ? AND in_stock = 1 ORDER BY id')
    : db.prepare('SELECT * FROM products WHERE in_stock = 1 ORDER BY id');
  const products = category ? stmt.all(category) : stmt.all();
  res.json(products);
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST add product (admin)
app.post('/api/products', (req, res) => {
  const { name, category, price, old_price, badge, rating, reviews, image } = req.body;
  if (!name || !category || !price || !image)
    return res.status(400).json({ error: 'name, category, price and image are required' });

  const result = db.prepare(
    'INSERT INTO products (name, category, price, old_price, badge, rating, reviews, image) VALUES (?,?,?,?,?,?,?,?)'
  ).run(name, category, price, old_price || null, badge || null, rating || 4.5, reviews || 0, image);

  res.status(201).json({ id: result.lastInsertRowid, message: 'Product created' });
});

// PUT update product (admin)
app.put('/api/products/:id', (req, res) => {
  const { name, category, price, old_price, badge, rating, reviews, image, in_stock } = req.body;
  db.prepare(
    `UPDATE products SET name=?, category=?, price=?, old_price=?, badge=?, rating=?, reviews=?, image=?, in_stock=?
     WHERE id=?`
  ).run(name, category, price, old_price, badge, rating, reviews, image, in_stock ?? 1, req.params.id);
  res.json({ message: 'Product updated' });
});

// DELETE product (admin)
app.delete('/api/products/:id', (req, res) => {
  db.prepare('UPDATE products SET in_stock = 0 WHERE id = ?').run(req.params.id);
  res.json({ message: 'Product removed from store' });
});

// ============================================================
//  ORDERS
// ============================================================

// GET all orders (admin)
app.get('/api/orders', (req, res) => {
  const { status } = req.query;
  const stmt = status
    ? db.prepare('SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC')
    : db.prepare('SELECT * FROM orders ORDER BY created_at DESC');
  const orders = status ? stmt.all(status) : stmt.all();

  // Attach items to each order
  const withItems = orders.map(order => ({
    ...order,
    items: db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id)
  }));
  res.json(withItems);
});

// GET single order
app.get('/api/orders/:id', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
  res.json(order);
});

// POST create order
app.post('/api/orders', (req, res) => {
  const { customer_name, customer_phone, customer_email, items } = req.body;
  if (!customer_name || !customer_phone || !items?.length)
    return res.status(400).json({ error: 'customer_name, customer_phone and items are required' });

  const orderId = 'ORD-' + Date.now();
  const total = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  const insertOrder = db.transaction(() => {
    db.prepare(
      `INSERT INTO orders (id, customer_name, customer_phone, customer_email, total)
       VALUES (?, ?, ?, ?, ?)`
    ).run(orderId, customer_name, customer_phone, customer_email || null, total);

    for (const item of items) {
      db.prepare(
        `INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
         VALUES (?, ?, ?, ?, ?)`
      ).run(orderId, item.product_id, item.product_name, item.price, item.quantity || 1);
    }
  });

  insertOrder();
  res.status(201).json({ id: orderId, total, message: 'Order created' });
});

// PATCH update order status / shipment
app.patch('/api/orders/:id', (req, res) => {
  const { status, shipment_status } = req.body;
  db.prepare(
    `UPDATE orders SET status = COALESCE(?, status),
     shipment_status = COALESCE(?, shipment_status),
     updated_at = datetime('now') WHERE id = ?`
  ).run(status || null, shipment_status || null, req.params.id);
  res.json({ message: 'Order updated' });
});

// ============================================================
//  STK PUSH TRANSACTIONS
// ============================================================

// GET all STK transactions (admin)
app.get('/api/stk', (req, res) => {
  const transactions = db.prepare('SELECT * FROM stk_transactions ORDER BY created_at DESC').all();
  res.json(transactions);
});

// POST create STK push record
app.post('/api/stk', (req, res) => {
  const { order_id, phone, amount, description } = req.body;
  if (!phone || !amount)
    return res.status(400).json({ error: 'phone and amount are required' });

  const txnId = 'TXN-' + Date.now();
  db.prepare(
    `INSERT INTO stk_transactions (id, order_id, phone, amount, description)
     VALUES (?, ?, ?, ?, ?)`
  ).run(txnId, order_id || null, phone, amount, description || 'STK Push Payment');

  res.status(201).json({ id: txnId, message: 'STK transaction recorded' });
});

// PATCH update STK status (e.g. after M-Pesa callback)
app.patch('/api/stk/:id', (req, res) => {
  const { status, mpesa_ref } = req.body;
  db.prepare(
    `UPDATE stk_transactions SET status = ?, mpesa_ref = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(status, mpesa_ref || null, req.params.id);
  res.json({ message: 'STK transaction updated' });
});

// ============================================================
//  ADMIN AUTH
// ============================================================

// POST login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'username and password are required' });

  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

  // For the default seeded admin, allow plain-text match during dev
  const match = password === 'reeves001!' && username === 'admin'
    ? true
    : bcrypt.compareSync(password, admin.password);

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
//  START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`🚀 Reeves Boutique API running on http://localhost:${PORT}`);
});
