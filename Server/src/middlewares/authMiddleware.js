import { verifyAccessToken } from "../utils/jwtUtils.js";
import CustomError from "../utils/customError.js";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authHeader:",authHeader);
    

    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new CustomError('No token provided', 401));
    }

    
    const token = authHeader.split(' ')[1];
   
    try {
        
        const decoded = verifyAccessToken(token);
        
        req.user = decoded;
        next();
    } catch (error) {
        next(new CustomError('Invalid token', 401));
    }
};
