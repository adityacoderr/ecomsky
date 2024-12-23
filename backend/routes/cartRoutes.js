const express = require('express');
const Cart = require('../models/Cart');  // Assuming you have a Cart model
// const Product = require('../models/Product'); 
 // Assuming you have a Product model
const User = require('../models/User');
const router = express.Router();

// Add product to cart
router.post('/add-to-cart', async (req, res) => {
    try {
      const { userId, productId, quantity, phoneNumber } = req.body;
  
      // Fetch the user phone number
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the cart already exists for this user
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        // If no cart exists, create a new cart
        cart = new Cart({
          userId,
          phone: phoneNumber,  // Store the user's phone number here
          items: [{ productId, quantity }],
        });
      } else {
        // If the cart exists, just add the product to it
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (existingItemIndex > -1) {
          // Update quantity if the product already exists
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          // Add new product
          cart.items.push({ productId, quantity });
        }
      }
  
      // Save the cart
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add product to cart' });
    }
  });
  
// Get cart items for a user
router.get('/cart-items/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart.items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Remove product from cart
router.delete('/remove-from-cart', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    cart = await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
