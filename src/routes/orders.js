const router = require('express').Router();
const Order = require('../models/order');
const Cart = require('../models/cart');
const { authenticate, adminOnly } = require('../middleware/auth');
const { paginate } = require('../utils/helpers');

// Tutte le route degli ordini richiedono autenticazione
router.use(authenticate);

// POST /api/orders - Crea ordine dal carrello
router.post('/', (req, res) => {
  const cart = Cart.getCartWithItems(req.user.id);

  if (cart.items.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Il carrello e\' vuoto. Aggiungi prodotti prima di effettuare un ordine.'
    });
  }

  const shippingAddress = req.body.shippingAddress || { street: 'Via Predefinita 1', city: 'Roma', zipcode: '00100', country: 'IT' };
  const paymentMethod = req.body.paymentMethod || 'credit_card';

  const items = cart.items.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.discountPrice || item.price
  }));

  const order = Order.create(req.user.id, items, cart.subtotal, shippingAddress, paymentMethod);

  // Svuota il carrello dopo l'ordine
  Cart.clearCart(req.user.id);

  res.status(201).json({
    success: true,
    data: order,
    message: 'Ordine effettuato con successo.'
  });
});

// GET /api/orders - Lista ordini dell'utente
router.get('/', (req, res) => {
  const { page, limit, offset } = paginate(req.query);
  const { orders, total } = Order.findByUserId(req.user.id, { page, limit, offset });

  res.json({
    success: true,
    data: orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

// GET /api/orders/:id - Dettaglio ordine
router.get('/:id', (req, res) => {
  const order = Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Ordine non trovato.'
    });
  }

  // Solo il proprietario o un admin puo' vedere l'ordine
  if (order.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Accesso negato.'
    });
  }

  res.json({ success: true, data: order });
});

// PUT /api/orders/:id/status - Aggiorna stato ordine (Solo Admin)
router.put('/:id/status', adminOnly, (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      error: `Stato non valido. Deve essere uno tra: ${validStatuses.join(', ')}`
    });
  }

  const order = Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Ordine non trovato.'
    });
  }

  const updated = Order.updateStatus(req.params.id, status);
  res.json({
    success: true,
    data: updated,
    message: `Stato dell'ordine aggiornato a "${status}".`
  });
});

// DELETE /api/orders/:id - Cancella ordine
router.delete('/:id', (req, res) => {
  const order = Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Ordine non trovato.'
    });
  }

  if (order.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Accesso negato.'
    });
  }

  if (order.status !== 'pending') {
    return res.status(400).json({
      success: false,
      error: 'Solo gli ordini in attesa possono essere cancellati.'
    });
  }

  const updated = Order.updateStatus(req.params.id, 'cancelled');
  res.json({
    success: true,
    data: updated,
    message: 'Ordine cancellato con successo.'
  });
});

module.exports = router;
