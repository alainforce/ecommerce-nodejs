import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true},
    lastName: { type: String, require: true},
    email: {
        type: String,
        required:[ true, "Email is required"],
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    create_at: { 
        type: Date,
        default: Date.now,
    } });

const User = mongoose.model("User", userSchema);
export default User;

