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
  changePassword,
  googleCallback
} from "../controllers/authController.js";
import dotenv from 'dotenv'
import passport from "passport";

dotenv.config()

const authRouter = Router();

authRouter.post("/signup", signupValidator, validateSignup, signup);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/refresh-token", refreshToken);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/resend-otp",resendOtp);
authRouter.post("/forgot-password",forgotPassword);
authRouter.post("/change-password",changePassword);


authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
  }),
  googleCallback
);


export default authRouter;
