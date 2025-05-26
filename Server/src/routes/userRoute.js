import { Router } from "express";
import {
  addToCart,
  getProductData,
  getCartData,
  checking,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  addAddress,
  verifyOtp,
  resendOtp,
  getUserData,
  addQuestion,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/user-data",authenticate, getUserData);
userRouter.get("/product-data", getProductData);
userRouter.get("/cart", authenticate, getCartData);

userRouter.post("/addToCart", authenticate, addToCart);
userRouter.post("/checking", authenticate, checking);
userRouter.post("/add-address", authenticate, addAddress);
userRouter.post("/verify-otp", authenticate, verifyOtp);
userRouter.post("/resend-otp", authenticate, resendOtp);

userRouter.patch("/increase-quantity", authenticate, increaseQuantity);
userRouter.patch("/decrease-quantity", authenticate, decreaseQuantity);
userRouter.patch("/question", authenticate, addQuestion);

userRouter.delete("/remove-item", authenticate, removeFromCart);


export default userRouter;
