const db = require('../config/database');

const Category = {
  findAll() {
    return db.prepare('SELECT * FROM categories').all();
  },

  findById(id) {
    return db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
  }
};

module.exports = Category;
