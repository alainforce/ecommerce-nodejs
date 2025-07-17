import mongoose from "mongoose";
import User from "./userModel.js";
import Order from "./orderModel.js";


const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },

  orderId: { type: mongoose.Schema.Types.ObjectId, ref: Order },

  status: { type: String, 
    enum: ['pending', 'success', 'failed'], 
    default: 'pending' },

  amount: { type: Number, required: true },

  method: { type: String, default: 'iyzico' },

  iyzipayPaymentId:  String,

  iyzipayConversationId: String,
  iyzipayRawResponse: Object,

}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;
