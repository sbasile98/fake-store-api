const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product');
const { paginate } = require('../utils/helpers');

// GET /api/categories
router.get('/', (req, res) => {
  const categories = Category.findAll();
  res.json(categories);
});

// GET /api/categories/:id/products
router.get('/:id/products', (req, res) => {
  const category = Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({
      success: false,
      error: 'Categoria non trovata.'
    });
  }

  const { page, limit, offset } = paginate(req.query);
  const { sort } = req.query;

  const { products, total } = Product.findAll({
    page, limit, offset, category: req.params.id, sort
  });

  res.set({
    'X-Total-Count': total,
    'X-Page': page,
    'X-Per-Page': limit,
    'X-Total-Pages': Math.ceil(total / limit)
  });

  res.json(products);
});

module.exports = router;
