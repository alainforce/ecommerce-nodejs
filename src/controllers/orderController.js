import { Error } from "mongoose";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import deliveryDay from "../services/deliveryDays.js"
import {takedOrdersEmail, orderdelivred} from "../services/send-email.js"
import User from "../models/userModel.js";


export const createOrder = async (req, res) => {
  try {

    const today = Date.now()
    const days = 3 // in 3 days it will be delivered 

    const {status, shippingAddress, paymentMethod} = req.body;
    const userId = req.user.id; // Assuming user is authenticated and ID is in req.user

    const cart = await Cart.findOne({user: userId})
    if(!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    
    const errors = [];
    const items = []

      for (let item of cart.items) { 

      const productId =  item.product;
      const product = await Product.findById(productId);
      if (!product) {
        errors.push('Product not found for item : ${item.product}');
        continue;
      }
      // Create a new item
      
      

      const newitem = {
          product: item.product,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          color: item.colors,
          size: item.sizes,
          image: product.images[0],
          amount: item.price * item.quantity, 
          paymentMethod : paymentMethod,
          
        
      };

      items.push(newitem )

  }

  if (errors.length > 0 && items.length === 0) {
      return res.status(400).json({ message: 'Failed to create items', errors });
    }

    if (errors.length > 0) {
      return res.status(207).json({
        message: 'Some items created with issues',
        items,
        errors,
      });
    }
  const estimatedDaydelivrey =   deliveryDay(today,days)

  const newOrder = new Order({
    user: userId,
    items: items,
    status: status,
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
    totalAmount: cart.totalAmount,
    totalItems: cart.totalItems,
    estimatedDelivery : estimatedDaydelivrey,
  })
  
    await newOrder.save();

    

    const mailInfo = {
      to : req.user.email,
      order: newOrder,
      customerName: req.user.firstName

    }
    
    await takedOrdersEmail(mailInfo) // send email 

    // Clear cart after successful order creation (optional)
   //await Cart.updateOne({ user: userId }, { $set: { items: [], totalAmount: 0, totalItems: 0 } });

    return res.status(201).json(newOrder);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;// Assuming order ID is passed as a URL parameter

    const orderUser = await Order.findOne({ user: req.user.id });
    if (!orderUser) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Find the order by ID and ensure it belongs to the user
    const order = await Order.findById(orderId );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({user: req.user.id}).sort({ createdAt: -1 });

     res.status(200).json(orders);
  } catch (error) {
    console.error(error);
     return res.status(500).json({ message: "Server error" });
  }
}


export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Assuming order ID is passed as a URL parameter
    const status = req.body; // Assuming updates are sent in the request body,

    const orderUser = await Order.findOne({ user: req.user.id });
    if (!orderUser) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Find the order by ID and update it
    const updatedOrder = await Order.findByIdAndUpdate(orderId, status, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Assuming order ID is passed as a URL parameter

    // Find the order by ID and delete it
    const orderUser = await Order.findOne({ user: req.user.id });
    if (!orderUser) {
      return res.status(404).json({ message: "Order not found" });
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).send("Order not found.");

    if (order.status === "cancelled") {
      return res.status(400).send("Order already cancelled.");
    }

    const now = new Date();
    const diffInHours = (now - new Date(order.createdAt)) / (1000 * 60 * 60);

    //  Customer can only cancel within 5 hours
    if (diffInHours <= 5) {
      order.status = "cancelled";
      await order.save();

      return res.send("Order cancelled successfully within 5 hours.");
    } else {
      return res.status(403).send("Cancellation window expired. Please contact support.");
    }

  } catch (err) {
    console.error("Error while cancelling order:", err);
    return res.status(500).send("Internal server error");
  }
};

export const delivered = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { deliveredDate} = req.body;
    const newstatus = "delivered";

    const date = new Date(deliveredDate);
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status: newstatus,
        deliveryDate: date.toISOString()
      },
      { new: true }
    );

    
    if (!order) return res.status(404).send("Order not found");

    await order.save()

    //  Email info
    const mailInfo = {
      to: req.user.email,
      order: order,
      customerName: req.user.firstName,
    };

   
    await orderdelivred(mailInfo);

    res.status(201).send({ message: "Order marked as delivered and email sent." });
  } catch (err) {
    console.error(" Error while marking order delivered:", err);
    res.status(500).send("Server error");
  }
};