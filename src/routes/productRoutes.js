import { Router } from "express";
import { getProductById, getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js"
import { authorize } from "../middlewares/authMiddleware.js";


const productRouter = Router();

productRouter.get("/", authorize, getAllProducts); // Get all products
productRouter.get("/:id",authorize, getProductById); // Get a specific product by ID
productRouter.post("/",adminMiddleware, createProduct); // Create a new product
productRouter.put("/:id", adminMiddleware, updateProduct); // Update a specific product by ID
productRouter.delete("/:id", adminMiddleware, deleteProduct); // Delete a specific product by ID

export default productRouter;