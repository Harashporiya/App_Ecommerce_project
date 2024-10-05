const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
  prise: {
    type: Number,
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
