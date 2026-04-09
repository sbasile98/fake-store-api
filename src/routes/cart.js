const router = require('express').Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

// GET /api/cart
router.get('/', (req, res) => {
  const cart = Cart.getCartWithItems(req.user.id);
  res.json(cart);
});

// POST /api/cart/items
router.post('/items', (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      error: 'Il campo productId e\' obbligatorio.'
    });
  }

  const product = Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Prodotto non trovato.'
    });
  }

  const cart = Cart.addItem(req.user.id, productId, quantity || 1);
  res.json(cart);
});

// PUT /api/cart/items/:productId
router.put('/items/:productId', (req, res) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Il campo quantity e\' obbligatorio.'
    });
  }

  const product = Product.findById(req.params.productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Prodotto non trovato.'
    });
  }

  const cart = Cart.updateItemQuantity(req.user.id, req.params.productId, quantity);
  res.json(cart);
});

// DELETE /api/cart/items/:productId
router.delete('/items/:productId', (req, res) => {
  const cart = Cart.removeItem(req.user.id, req.params.productId);
  res.json(cart);
});

// DELETE /api/cart
router.delete('/', (req, res) => {
  const cart = Cart.clearCart(req.user.id);
  res.json(cart);
});

module.exports = router;
