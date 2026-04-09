const router = require('express').Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

// GET /api/cart
router.get('/', (req, res) => {
  const cart = Cart.getCartWithItems(req.user.id);
  res.json({ success: true, data: cart });
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
  res.json({
    success: true,
    data: cart,
    message: `${product.title} aggiunto al carrello.`
  });
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

  const cart = Cart.updateItemQuantity(req.user.id, parseInt(req.params.productId), quantity);
  res.json({
    success: true,
    data: cart,
    message: 'Carrello aggiornato.'
  });
});

// DELETE /api/cart/items/:productId
router.delete('/items/:productId', (req, res) => {
  const cart = Cart.removeItem(req.user.id, parseInt(req.params.productId));
  res.json({
    success: true,
    data: cart,
    message: 'Prodotto rimosso dal carrello.'
  });
});

// DELETE /api/cart
router.delete('/', (req, res) => {
  const cart = Cart.clearCart(req.user.id);
  res.json({
    success: true,
    data: cart,
    message: 'Carrello svuotato.'
  });
});

module.exports = router;
