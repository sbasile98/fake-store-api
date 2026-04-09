require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  if (req.body === undefined) req.body = {};
  next();
});

// Documentation page
app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, 'src', 'views', 'docs.html');
  let html = fs.readFileSync(htmlPath, 'utf-8');
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const baseUrl = `${protocol}://${host}`;
  html = html.replace(/\{\{BASE_URL\}\}/g, baseUrl);
  res.type('html').send(html);
});

// API Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/products', require('./src/routes/products'));
app.use('/api/categories', require('./src/routes/categories'));
app.use('/api/cart', require('./src/routes/cart'));
app.use('/api/orders', require('./src/routes/orders'));
app.use('/api/users', require('./src/routes/users'));

// Error handling
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Fake Store API in esecuzione su http://localhost:${PORT}`);
  console.log(`📖 Documentazione disponibile su http://localhost:${PORT}/`);
  console.log(`\n📧 Account di test:`);
  console.log(`   Admin:   admin@fakestoreapi.com / admin123`);
  console.log(`   Cliente: mario.rossi@example.com / password123\n`);
});
