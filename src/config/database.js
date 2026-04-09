const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', '..', 'database.sqlite');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    email       TEXT UNIQUE NOT NULL,
    password    TEXT NOT NULL,
    firstName   TEXT NOT NULL,
    lastName    TEXT NOT NULL,
    phone       TEXT,
    address     TEXT,
    role        TEXT DEFAULT 'customer',
    createdAt   TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS categories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT UNIQUE NOT NULL,
    slug        TEXT UNIQUE NOT NULL,
    image       TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id            TEXT PRIMARY KEY,
    title         TEXT NOT NULL,
    description   TEXT NOT NULL,
    price         REAL NOT NULL,
    discountPrice REAL,
    stock         INTEGER DEFAULT 100,
    sku           TEXT UNIQUE NOT NULL,
    categoryId    INTEGER NOT NULL,
    image         TEXT NOT NULL,
    images        TEXT,
    rating        REAL DEFAULT 0,
    ratingCount   INTEGER DEFAULT 0,
    brand         TEXT,
    createdAt     TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS carts (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    userId    INTEGER NOT NULL UNIQUE,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    cartId    INTEGER NOT NULL,
    productId TEXT NOT NULL,
    quantity  INTEGER DEFAULT 1,
    FOREIGN KEY (cartId) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id),
    UNIQUE(cartId, productId)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    userId          INTEGER NOT NULL,
    total           REAL NOT NULL,
    status          TEXT DEFAULT 'pending',
    shippingAddress TEXT NOT NULL,
    paymentMethod   TEXT DEFAULT 'credit_card',
    createdAt       TEXT DEFAULT (datetime('now')),
    updatedAt       TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId   INTEGER NOT NULL,
    productId TEXT NOT NULL,
    quantity  INTEGER NOT NULL,
    price     REAL NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id)
  );
`);

// Seed data on first run
const seed = require('../seed');
seed(db);

module.exports = db;
