import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDatabase=async(next)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        
        if (next) {
            next(new CustomError('Failed to connect to the database', 500));
            
        } else {
            console.error("Database connection failed:", error.message);
            process.exit(1); 
        }
    }
};