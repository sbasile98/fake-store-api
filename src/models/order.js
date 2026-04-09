const db = require('../config/database');

const Order = {
  create(userId, items, total, shippingAddress, paymentMethod = 'credit_card') {
    const createOrder = db.transaction(() => {
      const result = db.prepare(
        'INSERT INTO orders (userId, total, shippingAddress, paymentMethod) VALUES (?, ?, ?, ?)'
      ).run(userId, total, JSON.stringify(shippingAddress), paymentMethod);

      const orderId = result.lastInsertRowid;

      const insertItem = db.prepare(
        'INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)'
      );

      for (const item of items) {
        insertItem.run(orderId, item.productId, item.quantity, item.price);
        // Decrease stock
        db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(item.quantity, item.productId);
      }

      return orderId;
    });

    const orderId = createOrder();
    return Order.findById(orderId);
  },

  findByUserId(userId, { page = 1, limit = 10, offset = 0 } = {}) {
    const total = db.prepare('SELECT COUNT(*) as total FROM orders WHERE userId = ?').get(userId).total;

    const orders = db.prepare(
      `SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?`
    ).all(userId, limit, offset);

    for (const order of orders) {
      if (order.shippingAddress) order.shippingAddress = JSON.parse(order.shippingAddress);
      order.items = db.prepare(
        `SELECT oi.*, p.title, p.sku FROM order_items oi
         JOIN products p ON oi.productId = p.id
         WHERE oi.orderId = ?`
      ).all(order.id);
    }

    return { orders, total };
  },

  findById(orderId) {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    if (!order) return null;

    if (order.shippingAddress) order.shippingAddress = JSON.parse(order.shippingAddress);

    order.items = db.prepare(
      `SELECT oi.*, p.title, p.sku FROM order_items oi
       JOIN products p ON oi.productId = p.id
       WHERE oi.orderId = ?`
    ).all(order.id);

    return order;
  },

  updateStatus(orderId, status) {
    db.prepare("UPDATE orders SET status = ?, updatedAt = datetime('now') WHERE id = ?").run(status, orderId);
    return Order.findById(orderId);
  }
};

module.exports = Order;
