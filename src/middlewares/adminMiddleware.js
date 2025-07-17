import { verifyJwtToken } from '../utils/jwtUtils.js';

import User from '../models/userModel.js';


const adminMiddleware = async (req, res, next) => {

  // Check for token in Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: ' no token provided' });
  }


  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = await verifyJwtToken(token);
    if (decoded.success === false) {
      throw new Error("decoded error");
    }
    // Check if the user exists in the database
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Attach the user info to the request object
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default adminMiddleware;
// This middleware checks if the user is an admin by verifying the JWT token and checking the user's role.
