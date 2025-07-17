import { Router } from "express";
import { getCart, addToCart, removeFromCart, clearCart } from "../controllers/cartController.js";
import { authorize } from "../middlewares/authMiddleware.js";


const cartRouter = Router();

cartRouter.get("/",authorize, getCart); // Get the user's cart
cartRouter.post("/add",authorize, addToCart); // Add an item to the cart
cartRouter.delete("/remove/:id",authorize, removeFromCart); // Remove an item from the cart
cartRouter.delete("/clear",authorize, clearCart); // Clear the cart

export default cartRouter;
// This code defines the routes for the shopping cart functionality in an Express.js application.
