import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import  { generateAuthTokens } from "../utils/jwtUtils.js";
import {WelcomeEmail} from "../services/send-email.js"


export const signUp = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    let statusCode = 500;
   
    try {
        const { firstName,lastName, email, password,role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            statusCode = 409;
            throw error;
        }
        const hashedPassword = bcrypt.hashSync(password, 12);
        const newUser = await User.create([
            { firstName,lastName, email, password:hashedPassword, role }], { session });

        const token = await generateAuthTokens(newUser._id);
        if (!token) {
            const error = new Error("Token generation failed");
            console.error("Token generation failed", error);
            statusCode = 500;
            throw error;
        }

        await session.commitTransaction();
        res.status(201).json({ 
            success: true, 
            message: "User created successfully", 
            data: { token, user: newUser }
        });
        
        const mailInfo = {
            to: email,
            customerName: newUser.firstName
        }

        await WelcomeEmail(mailInfo)
    } catch (error) {
        await session.abortTransaction();
        res.status(statusCode).json({ 
            success: false, 
            message: "Error creating user", 
            errors: error.message 
        });
    } finally {
        session.endSession();
    }
}
export const signIn = async (req, res) => {
    
 
    let statusCode = 500;
    try {
        const {email, password } = req.body;

        const user = await User.findOne({ email });
        
        if (!user) {
            const error = new Error("User not found");
            statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid password");
            statusCode = 401;
            throw error;
        }
        const token = await generateAuthTokens(user._id);
        if (!token) {
            const error = new Error("Token generation failed");
            statusCode = 500;
            throw error;
        }
        res.status(200).json({ 
            success:true, 
            message: "User logged in successfully", 
            data:{ token, user } 
        });
    } catch (error) {
         res.status(statusCode).json({ success: false, 
            message: "Error logging in", error });
    }

}