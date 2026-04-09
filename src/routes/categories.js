const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product');
const { paginate } = require('../utils/helpers');

// GET /api/categories
router.get('/', (req, res) => {
  const categories = Category.findAll();
  res.json({ success: true, data: categories });
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

  res.json({
    success: true,
    data: products,
    category,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

module.exports = router;
