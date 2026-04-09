const router = require('express').Router();
const Product = require('../models/product');
const { adminOnly } = require('../middleware/auth');
const { paginate } = require('../utils/helpers');

// GET /api/products
router.get('/', (req, res) => {
  const { page, limit, offset } = paginate(req.query);
  const { category, search, minPrice, maxPrice, sort } = req.query;

  const { products, total } = Product.findAll({
    page, limit, offset, category, search, minPrice, maxPrice, sort
  });

  res.set({
    'X-Total-Count': total,
    'X-Page': page,
    'X-Per-Page': limit,
    'X-Total-Pages': Math.ceil(total / limit)
  });

  res.json(products);
});

// GET /api/products/all - Tutti i prodotti senza paginazione
router.get('/all', (req, res) => {
  const { products, total } = Product.findAll({
    page: 1, limit: 1000, offset: 0
  });

  res.set('X-Total-Count', total);
  res.json(products);
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Prodotto non trovato.'
    });
  }

  res.json(product);
});

// POST /api/products (Admin only)
router.post('/', adminOnly, (req, res) => {
  const { title, description, price, warrantyMonths, stock, sku, categoryId, image, images, brand } = req.body;

  if (!title || !description || !price || !sku || !categoryId || !image) {
    return res.status(400).json({
      success: false,
      error: 'I campi title, description, price, sku, categoryId e image sono obbligatori.'
    });
  }

  const product = Product.create({ title, description, price, warrantyMonths, stock, sku, categoryId, image, images, brand });

  res.status(201).json(product);
});

// PUT /api/products/:id (Admin only)
router.put('/:id', adminOnly, (req, res) => {
  const existing = Product.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({
      success: false,
      error: 'Prodotto non trovato.'
    });
  }

  const product = Product.update(req.params.id, req.body);
  res.json(product);
});

// DELETE /api/products/:id (Admin only)
router.delete('/:id', adminOnly, (req, res) => {
  const existing = Product.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({
      success: false,
      error: 'Prodotto non trovato.'
    });
  }

  Product.delete(req.params.id);
  res.json({ message: 'Prodotto eliminato con successo.' });
});

module.exports = router;
