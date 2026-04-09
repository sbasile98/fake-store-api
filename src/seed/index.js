const seedCategories = require('./categories');
const seedUsers = require('./users');
const seedProducts = require('./products');

function seed(db) {
  const count = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
  if (count > 0) return; // Already seeded

  console.log('🌱 Popolamento database...');
  seedCategories(db);
  seedUsers(db);
  seedProducts(db);
  console.log('✅ Database popolato con successo!\n');
}

module.exports = seed;
