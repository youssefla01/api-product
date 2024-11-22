import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  warranty_years: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
