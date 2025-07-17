import  { Router } from "express";

import { getUserById, getAllUsers, updateUser, deleteUser } from "../controllers/userController.js";
import { authorize } from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const userRouter = Router();

userRouter.get("/", adminMiddleware, getAllUsers); // Get all users
userRouter.get("/:id", adminMiddleware, getUserById); // Get a specific user by ID        
userRouter.put("/:id", authorize, updateUser); // Update a specific user by ID  
userRouter.delete("/:id", adminMiddleware,deleteUser); // Delete a specific user by ID

export default userRouter;