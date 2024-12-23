// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: Number, required: true },  // Store the phone number
  items: [cartItemSchema],  // Cart items
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);
