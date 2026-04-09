const db = require('../config/database');

function generateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

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

    // Parse images JSON
    for (const p of products) {
      if (p.images) p.images = JSON.parse(p.images);
    }

    return { products, total: countRow.total };
  },

  findById(id) {
    const product = db.prepare(
      `SELECT p.*, c.name as categoryName, c.slug as categorySlug
       FROM products p
       LEFT JOIN categories c ON p.categoryId = c.id
       WHERE p.id = ?`
    ).get(id);

    if (product && product.images) {
      product.images = JSON.parse(product.images);
    }
    return product;
  },

  create(data) {
    let id = generateId();
    while (db.prepare('SELECT 1 FROM products WHERE id = ?').get(id)) {
      id = generateId();
    }
    db.prepare(
      `INSERT INTO products (id, title, description, price, discountPrice, stock, sku, categoryId, image, images, rating, ratingCount, brand)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id, data.title, data.description, data.price, data.discountPrice || null,
      data.stock || 100, data.sku, data.categoryId, data.image,
      data.images ? JSON.stringify(data.images) : null,
      data.rating || 0, data.ratingCount || 0, data.brand || null
    );
    return Product.findById(id);
  },

  update(id, data) {
    const allowed = ['title', 'description', 'price', 'discountPrice', 'stock', 'categoryId', 'image', 'images', 'brand'];
    const updates = [];
    const values = [];

    for (const key of allowed) {
      if (data[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(key === 'images' ? JSON.stringify(data[key]) : data[key]);
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
