const express = require('express');
const multer = require('multer');
const Product = require('../models/Product'); // Product model
const router = express.Router();

// Admin credentials
const ADMIN_ID = "123";
const ADMIN_PASSWORD = "123";

let isAuthenticated = false;

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Admin login route
router.post('/login', (req, res) => {
  const { id, password } = req.body;
  if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
    isAuthenticated = true;
    return res.status(200).json({ message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid ID or password' });
});

// Logout route
router.post('/logout', (req, res) => {
  isAuthenticated = false;
  return res.status(200).json({ message: 'Logout successful' });
});

// Add product route (with image upload)
router.post('/add-product', upload.single('image'), async (req, res) => {
  if (!isAuthenticated) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  const { name, price, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const product = new Product({ name, price, description, imageUrl });
    await product.save();
    return res.status(200).json({ message: 'Product added successfully', product });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding product', error });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

module.exports = router;
