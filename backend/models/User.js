const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: {
    type: Number,
    required: true,  // Ensure this field is required
    unique: true,    // Make sure phone is unique
  },
  password: {
    type: String,
    required: true,
  },
  // Other fields...
});

const User = mongoose.model('User', userSchema);
module.exports = User;
