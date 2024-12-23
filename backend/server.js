const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const cartAdminRoutes = require('./routes/cartAdminRoutes');

connectDB();

const app = express();




app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin-cart', cartAdminRoutes);
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
