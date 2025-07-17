import { verifyJwtToken } from '../utils/jwtUtils.js';
import User from '../models/userModel.js';

export const authorize = async (req, res, next) => {
    try {
        // Check for token in Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = await verifyJwtToken(token);
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        // Find user
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error('Authorization error:', error);
        return res.status(500).json({ success: false, message: error.message || 'Server error' });
    }
};