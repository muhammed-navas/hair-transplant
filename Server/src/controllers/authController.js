import User from "../models/User.js";
import CustomError from "../utils/customError.js";
import bcrypt from "bcryptjs";
import { sendOtpToUser } from "../utils/sendOtp.js";
import { generateOtp } from "../helpers/otpHelper.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwtUtils.js";
import { body } from "express-validator";



export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (!existingUser.isVerified) {
        console.log("not verified but saved to db");
        const { otp, otpExpiry } = generateOtp();
        sendOtpToUser(email, otp);
        console.log("otp:",otp);
        const hashedOtp = await bcrypt.hash(otp, 10);
        const hashedPassword = await bcrypt.hash(password, 10);
     existingUser.firstName=firstName,
     existingUser.lastName=lastName,
     existingUser.email=email,
     existingUser.password=hashedPassword,
     existingUser.otp=hashedOtp,
     existingUser.otpExpiry=otpExpiry

    await existingUser.save();
    return res.status(200).json({msg:"user need to verify"});
      } else {
        console.log("saved to db and also verified");
        return next(new CustomError("User already exists", 400));
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    

    const { otp, otpExpiry } = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    console.log("otp:", otp);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp: hashedOtp,
      otpExpiry,
    });

    await user.save();

    try {
      sendOtpToUser(email, otp);
    } catch (error) {
      console.error("Failed to send OTP email:", error);
    }

    res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please verify the OTP sent to your email.",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    
    console.log("req.body:",req.body);
    const { otp,email, isSignup } = req.body;
    console.log("email",email);
    
    if (!otp) {

      return next(new CustomError("OTP is required", 400));

    }
    

    
    const user = await User.findOne({email:email});
    console.log("user:",user);
    
    if (!user) {
      
      return next(new CustomError("user not found", 404));
    }
    
    if (user.otpExpiry < Date.now()) {
      return next(new CustomError("OTP has expired", 400));
    }
    console.log("reached hereee");
    const isOtpValid=await bcrypt.compare(otp,user.otp);
    console.log("isOtpValid:chehcking");
    console.log("isOtpValid:",isOtpValid);

    if(!isOtpValid){
      return next(new CustomError("Invalid OTP",400));
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    

    let responseData = {
      success: true,
      message: "OTP verified successfully",
    };

    if (isSignup) {
      const accessToken = generateAccessToken(user);
    
      const refreshToken = generateRefreshToken(user);
      

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      responseData = {
        ...responseData,
        accessToken,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      };
    } else {
      
      responseData.message = "OTP verified. You can now reset your password.";
    }

    res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
};


export const refreshToken = async (req, res, next) => {
  try {
    
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
      return next(new CustomError("No cookies found", 401));
    }

    
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());

    
    const refreshTokenCookie = cookies.find(cookie => cookie.startsWith('refreshToken='));

    if (!refreshTokenCookie) {
      return next(new CustomError("No refresh token provided", 401));
    }

    
    const refreshToken = refreshTokenCookie.split('=')[1];
 
 
    
    const decoded = verifyRefreshToken(refreshToken);
    
    const user = await User.findById(decoded.id);
    

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    
    const newAccessToken = generateAccessToken(user);

    
    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(new CustomError("Invalid or expired refresh token", 401));
  }
};


export const login = async (req, res, next) => {
  
  try {
    console.log("reached for login");
    const { email, password } = req.body;

    
    if (!email || !password) {
      return next(new CustomError("Please provide email and password", 400));
    }

    
    const user = await User.findOne({ email }).select("+password");
    console.log("user:",user);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new CustomError("Invalid credentials", 401));
    }

    
    if (!user.isVerified) {
      return next(new CustomError("Please verify your email first", 403));
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        _id: user._id,
        name: user.firstName,
        email: user.email,
        
      },
    });
  } catch (error) {
    next(error);
  }
};


export const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("email:",email);

    if (!email) {
      return next(new CustomError('Email is required', 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomError('User not found', 404));
    }

    const { otp, otpExpiry } = generateOtp();
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    try {
      await sendOtpToUser(email, otp);
    } catch (error) {
      console.error('Failed to send OTP email:', error);
      return next(new CustomError('Failed to send OTP. Please try again later.', 500));
    }

    res.status(200).json({
      success: true,
      message: "OTP resent successfully. Please check your email."
    });
  } catch (error) {
    next(error);
  }
};


export const logout = async (req, res, next) => {
  console.log('first')
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.status(200).json({ 
      success: true, 
      message: "Logged out successfully" 
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword =async(req,res,next)=>{
  console.log(req.body,"body");
  
  try {
    const {forgetemail}=req.body;
    console.log("forgetemail:",forgetemail);

    if (!forgetemail) {
      return next(new CustomError('Email is required', 400));
    }
    const user=await User.findOne({email:forgetemail});
    if (!user) {
      return next(new CustomError('User not found', 404));
    }
    const{otp,otpExpiry}=generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp=hashedOtp;
    user.otpExpiry=otpExpiry;
    await user.save();

    try {
      sendOtpToUser(forgetemail, otp);
    } catch (error) {
      console.error('Failed to send OTP email:', error);
      return next(new CustomError('Failed to send OTP. Please try again later.', 500));
    }
    res.status(200).json({
      success: true,
      message: "OTP resent successfully. Please check your email."
    });

  } catch (error) {
    next(error);
  }
}


export const changePassword = async (req, res, next) => {
  try {
    console.log("heyy");
    
    console.log("req.body:",req.body);
    
    const { password, forgetemail } = req.body;

    if (!forgetemail || !password) {
      return next(new CustomError('Email and new password are required', 400));
    }

    const user = await User.findOne({ email:forgetemail });
    if (!user) {
      return next(new CustomError('User not found', 404));
    }

    user.password = password;
    await user.save();

    const accessToken = generateAccessToken (user);
    const refreshToken = generateRefreshToken (user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

   

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      message: 'Password changed successfully'
    });

  } catch (error) {
    next(new CustomError('Error changing password', 500));
  }
};