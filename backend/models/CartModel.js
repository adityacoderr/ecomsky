const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },  // Can be 'active' or 'checked out'
});

const Cart = mongoose.model('Cart', cartItemSchema);
module.exports = Cart;
