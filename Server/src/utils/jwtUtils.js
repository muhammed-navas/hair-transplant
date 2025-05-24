import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY; 
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;

export const generateAccessToken=(user)=>{
    return jwt.sign({id:user._id},accessTokenSecret,{expiresIn:accessTokenExpiry});

};

export const generateRefreshToken=(user)=>{
    return jwt.sign({id:user._id},refreshTokenSecret,{expiresIn:refreshTokenExpiry});
};

export const verifyAccessToken=(token)=>{
    return jwt.verify(token,accessTokenSecret);
};

export const verifyRefreshToken=(refreshToken)=>{
    
    return jwt.verify(refreshToken,refreshTokenSecret)
};