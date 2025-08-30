import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['phones', 'laptops', 'cars', 'accessories'],
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    enum: ['new', 'hot deal', 'used'],
  }],
  status: {
    type: String,
    enum: ['available', 'sold out'],
    default: 'available',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  whatsappNumber: {
    type: String,
    required: true,
  },
  interests: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);