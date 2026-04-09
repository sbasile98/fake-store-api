const db = require('../config/database');

const User = {
  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },

  findById(id) {
    return db.prepare('SELECT id, email, firstName, lastName, phone, address, role, createdAt FROM users WHERE id = ?').get(id);
  },

  create({ email, password, firstName, lastName, phone, address }) {
    const result = db.prepare(
      'INSERT INTO users (email, password, firstName, lastName, phone, address) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(email, password, firstName, lastName, phone || null, address ? JSON.stringify(address) : null);
    return User.findById(result.lastInsertRowid);
  },

  update(id, fields) {
    const allowed = ['firstName', 'lastName', 'phone', 'address'];
    const updates = [];
    const values = [];

    for (const key of allowed) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(key === 'address' ? JSON.stringify(fields[key]) : fields[key]);
      }
    }

    if (updates.length === 0) return User.findById(id);

    values.push(id);
    db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    return User.findById(id);
  },

  findAll() {
    return db.prepare('SELECT id, email, firstName, lastName, phone, address, role, createdAt FROM users').all();
  }
};

module.exports = User;
