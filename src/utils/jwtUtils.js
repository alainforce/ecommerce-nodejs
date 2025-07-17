import {JWT_SECRET, JWT_EXPIRATION} from "../config/env.js";
import jwt from "jsonwebtoken";
import {promisify} from "util";


const signToken = promisify(jwt.sign);
const verifyToken = promisify(jwt.verify);

  
  // Generate  tokens for authentication
  export const generateAuthTokens = async (userId) => {
    const token = await signToken(
      { id: userId }, JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );
  
    return token;
  };
  
  // Verify JWT from Authorization header
  export const verifyJwtToken = async (token) => {
    try {
      const decoded = await verifyToken(token, JWT_SECRET);
      return  decoded ;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };
 
