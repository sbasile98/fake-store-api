const db = require('../config/database');

const Product = {
  findAll({ page = 1, limit = 10, offset = 0, category, search, minPrice, maxPrice, sort } = {}) {
    let where = [];
    let params = [];

    if (category) {
      where.push('c.slug = ? OR c.id = ?');
      params.push(category, category);
    }
    if (search) {
      where.push('(p.title LIKE ? OR p.description LIKE ? OR p.brand LIKE ?)');
      const term = `%${search}%`;
      params.push(term, term, term);
    }
    if (minPrice) {
      where.push('p.price >= ?');
      params.push(parseFloat(minPrice));
    }
    if (maxPrice) {
      where.push('p.price <= ?');
      params.push(parseFloat(maxPrice));
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';

    let orderBy = 'p.id ASC';
    switch (sort) {
      case 'price_asc': orderBy = 'p.price ASC'; break;
      case 'price_desc': orderBy = 'p.price DESC'; break;
      case 'rating': orderBy = 'p.rating DESC'; break;
      case 'newest': orderBy = 'p.createdAt DESC'; break;
    }

    const countRow = db.prepare(
      `SELECT COUNT(*) as total FROM products p LEFT JOIN categories c ON p.categoryId = c.id ${whereClause}`
    ).get(...params);

    const products = db.prepare(
      `SELECT p.*, c.name as categoryName, c.slug as categorySlug
       FROM products p
       LEFT JOIN categories c ON p.categoryId = c.id
       ${whereClause}
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`
    ).all(...params, limit, offset);

    return { products, total: countRow.total };
  },

  findById(id) {
    return db.prepare(
      `SELECT p.*, c.name as categoryName, c.slug as categorySlug
       FROM products p
       LEFT JOIN categories c ON p.categoryId = c.id
       WHERE p.id = ?`
    ).get(id);
  },

  create(data) {
    const result = db.prepare(
      `INSERT INTO products (sku, title, description, price, warrantyMonths, returnDays, stock, categoryId, rating, ratingCount, brand)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      data.sku, data.title, data.description, data.price,
      data.warrantyMonths || 0, data.returnDays || 0,
      data.stock || 100, data.categoryId,
      data.rating || 0, data.ratingCount || 0, data.brand || null
    );
    return Product.findById(result.lastInsertRowid);
  },

  update(id, data) {
    const allowed = ['sku', 'title', 'description', 'price', 'warrantyMonths', 'returnDays', 'stock', 'categoryId', 'brand'];
    const updates = [];
    const values = [];

    for (const key of allowed) {
      if (data[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(data[key]);
      }
    }

    if (updates.length === 0) return Product.findById(id);

    values.push(id);
    db.prepare(`UPDATE products SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    return Product.findById(id);
  },

  delete(id) {
    return db.prepare('DELETE FROM products WHERE id = ?').run(id);
  }
};

module.exports = Product;
