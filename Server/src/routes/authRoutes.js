import { Router } from "express";
import { signupValidator, validateSignup } from "../middlewares/validation.js";
import {
  refreshToken,
  signup,
  verifyOtp,
  resendOtp,
  login,
  logout,
  forgotPassword,
  changePassword
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", signupValidator, validateSignup, signup);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/refresh-token", refreshToken);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/resend-otp",resendOtp);
authRouter.post("/forgot-password",forgotPassword);
authRouter.post("/change-password",changePassword);



export default authRouter;
