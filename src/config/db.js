import mongoose from "mongoose";
import { DB_URI } from "./env.js";



const connectDB = async () => {
    try {
        if (!DB_URI) {
            throw new Error("Database URI is not defined in environment variables.");
        }
        // Connect to MongoDB using Mongoose
        await mongoose.connect(DB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
}
export default connectDB;