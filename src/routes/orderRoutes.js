import { Router } from "express";
import {  createOrder, updateOrder,getOrderById,getAllOrders,  deleteOrder, cancelOrder, delivered } from "../controllers/orderController.js";
import { authorize } from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js"


const orderRouter = Router();

orderRouter.get("/",authorize, getAllOrders); // Get all orders
orderRouter.post("/",authorize, createOrder); // Create a new order   
orderRouter.put("/:id", adminMiddleware,updateOrder); // Update a specific order by ID
orderRouter.get("/:id", authorize, getOrderById); // Get a specific order by ID
orderRouter.delete("/:id", authorize, deleteOrder); // Delete a specific order by ID
orderRouter.put("/:id/cancel",authorize, cancelOrder ) // Cancel a specific order by ID 
orderRouter.put("/:id/delivered", authorize, delivered) // delivery a specific order by ID 

export default orderRouter;
