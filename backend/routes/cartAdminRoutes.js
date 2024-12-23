const express = require('express');
const Cart = require('../models/Cart'); // Assuming you have a Cart model
const Product = require('../models/Product'); // Assuming you have a Product model

const router = express.Router();

// Get all user carts
router.get('/admin/carts', async (req, res) => {
    try {
      const carts = await Cart.find()
        .populate('items.productId')  // Populate product details
        .exec();
  
      res.status(200).json(carts);  // Return the carts, now with phone numbers included
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch carts' });
    }
  });

// Get a specific user's cart by userId
router.get('/admin/carts/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the cart for the given userId and populate product details
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while fetching user cart' });
  }
});

// Delete a product from a user's cart
router.delete('/admin/remove-from-cart', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    // Filter out the product from the cart's items array
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    // Save the updated cart
    cart = await cart.save();

    return res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while removing product from cart' });
  }
});

module.exports = router;
