-- ============================================================
--  REEVES BOUTIQUE DATABASE SCHEMA
-- ============================================================

-- Drop tables if they exist (for clean re-runs)
DROP TABLE IF EXISTS stk_transactions;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS newsletter_subscribers;

-- ============================================================
--  ADMINS
-- ============================================================
CREATE TABLE admins (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  username    TEXT    NOT NULL UNIQUE,
  password    TEXT    NOT NULL,          -- bcrypt hashed
  email       TEXT    NOT NULL UNIQUE,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- ============================================================
--  PRODUCTS
-- ============================================================
CREATE TABLE products (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  category    TEXT    NOT NULL,
  price       REAL    NOT NULL,
  old_price   REAL,
  badge       TEXT,
  rating      REAL    DEFAULT 4.5,
  reviews     INTEGER DEFAULT 0,
  image       TEXT    NOT NULL,
  in_stock    INTEGER DEFAULT 1,         -- 1 = true, 0 = false
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- ============================================================
--  CUSTOMERS (captured at order time)
-- ============================================================
CREATE TABLE customers (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  email       TEXT,
  phone       TEXT    NOT NULL,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- ============================================================
--  ORDERS
-- ============================================================
CREATE TABLE orders (
  id               TEXT    PRIMARY KEY,   -- e.g. ORD-1718000000000
  customer_id      INTEGER REFERENCES customers(id),
  customer_name    TEXT    NOT NULL,
  customer_phone   TEXT    NOT NULL,
  customer_email   TEXT,
  total            REAL    NOT NULL,
  status           TEXT    DEFAULT 'pending',   -- pending | paid | cancelled
  shipment_status  TEXT    DEFAULT 'order_confirmed',
  -- order_confirmed | processing | shipped | out_for_delivery | delivered
  created_at       TEXT    DEFAULT (datetime('now')),
  updated_at       TEXT    DEFAULT (datetime('now'))
);

-- ============================================================
--  ORDER ITEMS
-- ============================================================
CREATE TABLE order_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id    TEXT    NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  INTEGER NOT NULL REFERENCES products(id),
  product_name TEXT   NOT NULL,
  price       REAL    NOT NULL,
  quantity    INTEGER NOT NULL DEFAULT 1
);

-- ============================================================
--  STK PUSH TRANSACTIONS
-- ============================================================
CREATE TABLE stk_transactions (
  id           TEXT    PRIMARY KEY,       -- e.g. TXN-1718000000000
  order_id     TEXT    REFERENCES orders(id),
  phone        TEXT    NOT NULL,
  amount       REAL    NOT NULL,
  description  TEXT,
  status       TEXT    DEFAULT 'sent',    -- sent | completed | failed
  mpesa_ref    TEXT,                      -- M-Pesa confirmation code
  created_at   TEXT    DEFAULT (datetime('now')),
  updated_at   TEXT    DEFAULT (datetime('now'))
);

-- ============================================================
--  NEWSLETTER SUBSCRIBERS
-- ============================================================
CREATE TABLE newsletter_subscribers (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT    NOT NULL UNIQUE,
  subscribed_at TEXT  DEFAULT (datetime('now'))
);

-- ============================================================
--  INDEXES
-- ============================================================
CREATE INDEX idx_products_category   ON products(category);
CREATE INDEX idx_orders_status       ON orders(status);
CREATE INDEX idx_orders_customer     ON orders(customer_phone);
CREATE INDEX idx_order_items_order   ON order_items(order_id);
CREATE INDEX idx_stk_order           ON stk_transactions(order_id);
CREATE INDEX idx_stk_status          ON stk_transactions(status);
