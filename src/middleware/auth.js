const bcrypt = require('bcryptjs');
const db = require('../config/database');

function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Fake Store API"');
    return res.status(401).json({
      success: false,
      error: 'Autenticazione richiesta. Usa Basic Auth con email e password.'
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [email, password] = credentials.split(':');

  if (!email || !password) {
    return res.status(401).json({
      success: false,
      error: 'Credenziali non valide. Fornisci email e password.'
    });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

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

  const { password: _, ...userWithoutPassword } = user;
  req.user = userWithoutPassword;
  next();
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Accesso negato. Sono richiesti i privilegi di amministratore.'
    });
  }
  next();
}

module.exports = { basicAuth, adminOnly };
