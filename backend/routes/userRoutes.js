const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const router = express.Router();

router.get('/user-cart/:userId', async (req, res) => {
    try {
      const { userId } = req.params; // Get the userId from the route parameter
  
      // Find the user by userId and include the phone number
      const user = await User.findById(userId, 'name phone');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Fetch the cart for the specific user
      const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');
      if (!cart) {
        return res.status(404).json({ message: 'No cart found for this user' });
      }
  
      // Send back the user details along with their cart
      res.json({
        user: {
          name: user.name,
          phone: user.phone,
        },
        cart: cart.items, // Send the items in the cart
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch user cart details' });
    }
  });
  
// Sign up route
router.post('/signup', async (req, res) => {
    const { phoneNumber, password } = req.body;
  
    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'Phone number and password are required' });
    }
  
    try {
      // Validate if the phone number is already registered
      const existingUser = await User.findOne({ phone: phoneNumber });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this phone number already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Create the user
      const newUser = new User({
        phone: phoneNumber,  // Ensure phone is being set properly
        password: hashedPassword,
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();
  
      // Generate a token (optional)
      const token = jwt.sign({ userId: savedUser._id }, 'your-secret-key', { expiresIn: '1h' });
  
      // Send the response with user ID and token
      res.status(201).json({ userId: savedUser._id, token });
  
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Login route
router.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body;
  
    // Check if phone number and password are provided
    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'Phone number and password are required' });
    }
  
    try {
      // Check if the user exists with the given phone number
      const user = await User.findOne({ phone: phoneNumber });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Verify the password (assuming bcrypt is used to hash passwords)
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // If login is successful, you can return user info and a token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  
      res.status(200).json({
        userId: user._id,
        token,
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/user-details', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is passed in Authorization header as Bearer token
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your-secret-key');
      const userId = decoded.userId;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        phone: user.phone,
        
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;
