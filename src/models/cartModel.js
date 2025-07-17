import mongoose from "mongoose";
import User from "./userModel.js";
import Product from "./productModel.js";



const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Product, // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  name: {
    type: String // Product name
    
  },
  price: {
    type: Number // Product price
    
  },
  
  colors: {
    type:String // Array of color values
  },
  sizes: {
    type: String // Array of size values
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, // Reference to the User model
    required: true,
    unique: true, // One cart per user
  },
  items: [cartItemSchema], // Array of cart items
  totalAmount: {
    type: Number,
    default: 0, // Calculated dynamically
  },
  totalItems: {
    type: Number,
    default: 0, // Calculated dynamically
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });


const Cart = mongoose.model("Cart", cartSchema);
export default Cart; 