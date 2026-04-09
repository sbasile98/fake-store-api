const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { email, password, firstName, lastName, phone, address } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      success: false,
      error: 'I campi email, password, firstName e lastName sono obbligatori.'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'La password deve essere di almeno 6 caratteri.'
    });
  }

  const existing = User.findByEmail(email);
  if (existing) {
    return res.status(409).json({
      success: false,
      error: 'Esiste gia\' un account con questa email.'
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = User.create({ email, password: hashedPassword, firstName, lastName, phone, address });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(201).json({
    success: true,
    data: { user, token },
    message: 'Account creato con successo.'
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email e password sono obbligatori.'
    });
  }

  const user = User.findByEmail(email);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Email o password non validi.'
    });
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(401).json({
      success: false,
      error: 'Email o password non validi.'
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    data: { user: userWithoutPassword, token },
    message: 'Login effettuato con successo.'
  });
});

module.exports = router;
