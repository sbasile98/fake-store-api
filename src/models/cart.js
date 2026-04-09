const db = require('../config/database');

const Cart = {
  getOrCreateCart(userId) {
    let cart = db.prepare('SELECT * FROM carts WHERE userId = ?').get(userId);
    if (!cart) {
      const result = db.prepare('INSERT INTO carts (userId) VALUES (?)').run(userId);
      cart = db.prepare('SELECT * FROM carts WHERE id = ?').get(result.lastInsertRowid);
    }
    return cart;
  },

  getCartWithItems(userId) {
    const cart = Cart.getOrCreateCart(userId);

    const items = db.prepare(
      `SELECT ci.id, ci.quantity, p.id as productId, p.title, p.price, p.image, p.stock
       FROM cart_items ci
       JOIN products p ON ci.productId = p.id
       WHERE ci.cartId = ?`
    ).all(cart.id);

    const subtotal = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    return {
      id: cart.id,
      userId: cart.userId,
      items,
      itemCount: items.length,
      subtotal: Math.round(subtotal * 100) / 100,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt
    };
  },

  addItem(userId, productId, quantity = 1) {
    const cart = Cart.getOrCreateCart(userId);

    const existing = db.prepare(
      'SELECT * FROM cart_items WHERE cartId = ? AND productId = ?'
    ).get(cart.id, productId);

    if (existing) {
      db.prepare(
        'UPDATE cart_items SET quantity = quantity + ? WHERE cartId = ? AND productId = ?'
      ).run(quantity, cart.id, productId);
    } else {
      db.prepare(
        'INSERT INTO cart_items (cartId, productId, quantity) VALUES (?, ?, ?)'
      ).run(cart.id, productId, quantity);
    }

    db.prepare("UPDATE carts SET updatedAt = datetime('now') WHERE id = ?").run(cart.id);
    return Cart.getCartWithItems(userId);
  },

  updateItemQuantity(userId, productId, quantity) {
    const cart = Cart.getOrCreateCart(userId);

    if (quantity <= 0) {
      db.prepare('DELETE FROM cart_items WHERE cartId = ? AND productId = ?').run(cart.id, productId);
    } else {
      db.prepare(
        'UPDATE cart_items SET quantity = ? WHERE cartId = ? AND productId = ?'
      ).run(quantity, cart.id, productId);
    }

    db.prepare("UPDATE carts SET updatedAt = datetime('now') WHERE id = ?").run(cart.id);
    return Cart.getCartWithItems(userId);
  },

  removeItem(userId, productId) {
    const cart = Cart.getOrCreateCart(userId);
    db.prepare('DELETE FROM cart_items WHERE cartId = ? AND productId = ?').run(cart.id, productId);
    db.prepare("UPDATE carts SET updatedAt = datetime('now') WHERE id = ?").run(cart.id);
    return Cart.getCartWithItems(userId);
  },

  clearCart(userId) {
    const cart = Cart.getOrCreateCart(userId);
    db.prepare('DELETE FROM cart_items WHERE cartId = ?').run(cart.id);
    db.prepare("UPDATE carts SET updatedAt = datetime('now') WHERE id = ?").run(cart.id);
    return Cart.getCartWithItems(userId);
  }
};

module.exports = Cart;
