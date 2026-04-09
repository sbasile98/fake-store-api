const bcrypt = require('bcryptjs');

const users = [
  { email: 'admin@fakestoreapi.com', password: 'admin123', firstName: 'Admin', lastName: 'User', role: 'admin', phone: '+1-555-0100', address: { street: '123 Admin St', city: 'New York', zipcode: '10001', country: 'US' } },
  { email: 'mario.rossi@example.com', password: 'password123', firstName: 'Mario', lastName: 'Rossi', role: 'customer', phone: '+39-333-1234567', address: { street: 'Via Roma 1', city: 'Milano', zipcode: '20100', country: 'IT' } },
  { email: 'jane.smith@example.com', password: 'password123', firstName: 'Jane', lastName: 'Smith', role: 'customer', phone: '+1-555-0200', address: { street: '456 Oak Ave', city: 'Los Angeles', zipcode: '90001', country: 'US' } },
  { email: 'carlos.garcia@example.com', password: 'password123', firstName: 'Carlos', lastName: 'Garcia', role: 'customer', phone: '+34-612-345678', address: { street: 'Calle Mayor 10', city: 'Madrid', zipcode: '28001', country: 'ES' } },
  { email: 'yuki.tanaka@example.com', password: 'password123', firstName: 'Yuki', lastName: 'Tanaka', role: 'customer', phone: '+81-90-1234-5678', address: { street: '1-2-3 Shibuya', city: 'Tokyo', zipcode: '150-0002', country: 'JP' } }
];

function seedUsers(db) {
  const insert = db.prepare(
    'INSERT INTO users (email, password, firstName, lastName, role, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );

  for (const user of users) {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    insert.run(user.email, hashedPassword, user.firstName, user.lastName, user.role, user.phone, JSON.stringify(user.address));
  }
  console.log(`  ✓ ${users.length} utenti inseriti`);
}

module.exports = seedUsers;
