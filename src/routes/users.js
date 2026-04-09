const router = require('express').Router();
const User = require('../models/user');
const { authenticate, adminOnly } = require('../middleware/auth');

// Tutte le route utente richiedono autenticazione
router.use(authenticate);

// GET /api/users/profile
router.get('/profile', (req, res) => {
  const user = User.findById(req.user.id);

  if (user && user.address) {
    user.address = JSON.parse(user.address);
  }

  res.json({ success: true, data: user });
});

// PUT /api/users/profile
router.put('/profile', (req, res) => {
  const { firstName, lastName, phone, address } = req.body;
  const user = User.update(req.user.id, { firstName, lastName, phone, address });

  if (user && user.address) {
    user.address = JSON.parse(user.address);
  }

  res.json({
    success: true,
    data: user,
    message: 'Profilo aggiornato con successo.'
  });
});

// GET /api/users (Solo Admin)
router.get('/', adminOnly, (req, res) => {
  const users = User.findAll();

  for (const user of users) {
    if (user.address) user.address = JSON.parse(user.address);
  }

  res.json({ success: true, data: users });
});

module.exports = router;
