import mongoose, { Types } from "mongoose";
import User from "./userModel.js";
import Product from "./productModel.js";
// Order model for storing order details

const orderItemSchema = new mongoose.Schema({

 product: {
  type: mongoose.Schema.Types.ObjectId,
  ref: Product,
  required: true
 },
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  image: { type: String },
  color: { type: String },
  size: { type: String },
  amount: {type: Number},
  
});

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, required: true },
  items: [ orderItemSchema],
  totalAmount: { type: Number },
  totalItems: { type: Number },
  
  status: { 
    type: String, 
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  },
  shippingAddress: {
    firstName: { type: String },
    lastName: { type: String },
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
    phone: { type: String }
  },
  
  paymentMethod: {
    type: { type: String, enum: ['credit_card', 'paypal'], required: true },
    last3: { type: String },
    expiryDate: { type: String }
  },
  estimatedDelivery: { type: Date },
  deliveryDate: {type: Date},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;