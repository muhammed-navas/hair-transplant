import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();


const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || "1h"; 
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '7d';

export const generateAccessToken=(user)=>{
    return jwt.sign({ id: user._id }, accessTokenSecret, {
      expiresIn: '1h',
    });

};

export const generateRefreshToken=(user)=>{
    return jwt.sign({ id: user._id }, refreshTokenSecret, {
      expiresIn: '7d',
    });
};

export const verifyAccessToken=(token)=>{
    return jwt.verify(token,accessTokenSecret);
};

export const verifyRefreshToken=(refreshToken)=>{
    
    return jwt.verify(refreshToken,refreshTokenSecret)
};