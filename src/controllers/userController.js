import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password from the response
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { firstName,lastName, email, password} = req.body;
 
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if(firstName) user.firstName = firstName;
        if(lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (password) user.password = bcrypt.hashSync(password, 12); // Hash the password before saving
       
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
