import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import CustomError from "../utils/customError.js";
import Stock from "../models/Stock.js";
import { generateOtp } from "../helpers/otpHelper.js";
import { v4 as uuidv4 } from "uuid";
import { sendOtpMob } from "../utils/sendOtpMob.js";
import Address from "../models/Address.js";
import User from "../models/User.js";

export const getUserData = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
    // .populate("cart")
    // .populate("orders")
    // .populate("address");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getProductData = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in database" });
    }

    return res.status(200).json({
      message: "Products retrieved successfully",
      products: products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return next(new CustomError("Product ID and quantity are required", 404));
    }

    const productStock = await Product.findById(productId);

    if (!productStock || productStock.stock < quantity) {
      return next(new CustomError("Insufficient stock available", 400));
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    const itemTotal = productStock.price * quantity;

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].itemTotal += productStock.price * quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        itemTotal: productStock.price * quantity,
        image: productStock.image,
        stock: productStock.stock,
      });
    }

    // Update stock
    productStock.stock -= quantity;
    await productStock.save();

    // Recalculate cart total
    cart.cartTotal = cart.items.reduce(
      (total, item) => total + item.itemTotal,
      0
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      addedProduct: {
        id: productId,
        image: productStock.image,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCartData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return next(new CustomError("User ID is required", 400));
    }

    const cartData = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name price",
    });

    if (!cartData || cartData.items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cartData: {
          cartTotal: 0,
          items: [],
        },
      });
    }

    let recalculatedCartTotal = 0;
    let updatedItems = false;
    let image = null;

    cartData.items.forEach((item) => {
      const recalculatedItemTotal = item.quantity * item.product.price;
      recalculatedCartTotal += recalculatedItemTotal;

      if (item.itemTotal !== recalculatedItemTotal) {
        item.itemTotal = recalculatedItemTotal;
        updatedItems = true;
      }
    });

    if (cartData.cartTotal !== recalculatedCartTotal || updatedItems) {
      cartData.cartTotal = recalculatedCartTotal;
      await cartData.save();
    }


    return res.status(200).json({
      success: true,
      message: "Cart data fetched successfully",
      cartData: cartData,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return next(new CustomError("Product ID is required", 400));
    }

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return next(new CustomError("Cart not found", 404));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      const stock = await Product.findById(productId);
      stock.quantity += cart.items[itemIndex].quantity;
      await stock.save();

      cart.items.splice(itemIndex, 1);
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const checking = async (req, res, next) => {
};

export const increaseQuantity = async (req, res, next) => {
  try {
    const { productId, newQuantity } = req.body;

    if (!productId || newQuantity <= 0) {
      return next(
        new CustomError("Product id and valid quantity are required", 400)
      );
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return next(new CustomError("Cart not found", 404));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      return next(new CustomError("Product not found in cart", 404));
    }

    const stock = await Product.findById(productId);
    if (!stock) {
      return next(new CustomError("Stock information not found", 404));
    }

    if (stock.quantity < newQuantity - cart.items[itemIndex].quantity) {
      return next(
        new CustomError("Insufficient stock to increase the quantity", 400)
      );
    }

    stock.quantity -= newQuantity - cart.items[itemIndex].quantity;
    cart.items[itemIndex].quantity = newQuantity;

    await cart.save();
    await stock.save();

    res.status(200).json({
      success: true,
      message: "Product quantity increased successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const decreaseQuantity = async (req, res, next) => {
  try {
    const { productId, newQuantity } = req.body;

    if (!productId || newQuantity <= 0) {
      return next(
        new CustomError("Product id and valid quantity are required", 400)
      );
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return next(new CustomError("Cart not found", 404));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      return next(new CustomError("Product not found in cart", 404));
    }

    if (newQuantity >= cart.items[itemIndex].quantity) {
      return next(
        new CustomError(
          "New quantity must be less than the current quantity",
          400
        )
      );
    }

    const stock = await Product.findById(productId);
    if (!stock) {
      return next(new CustomError("Stock information not found", 404));
    }

    stock.quantity += cart.items[itemIndex].quantity - newQuantity;
    cart.items[itemIndex].quantity = newQuantity;

    await cart.save();
    await stock.save();

    res.status(200).json({
      success: true,
      message: "Product quantity decreased successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addAddress = async (req, res, next) => {
  try {
    const {
      email,
      firstName,
      lastName,
      address,
      city,
      postcode,
      mobilePhone,
      landmark,
      isAddress,
    } = req.body;

    if (
      !email ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !postcode ||
      !mobilePhone 
    ) {
      return next(new CustomError("All fields required", 400));
    }

    const userId = req.user.id;
    if (!userId) {
      return next(new CustomError("userId required", 404));
    }
    const { otp, otpExpiry } = generateOtp();
    const key = uuidv4();

    const pendingAddress = {
      key,
      userId,
      email,
      firstName,
      lastName,
      address,
      city,
      postcode,
      mobilePhone,
      landmark,
      otp,
      otpExpiry,
    };
    req.session.pendingAddress = pendingAddress;

    await sendOtpMob(mobilePhone, otp);
;
    res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please verify to add the address",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {

    const user = req.user.id;
    const { otp } = req.body;


    if (!req.session.pendingAddress) {
      return next(
        new CustomError("Session expired or no OTP request found", 400)
      );
    }
    const {
      otp: sessionOtp,
      otpExpiry,
      ...addressData
    } = req.session.pendingAddress;

    if (otp !== sessionOtp) {
      return next(new CustomError("Invalid OTP", 400));
    }

    if (Date.now() > otpExpiry) {
      return next(new CustomError("OTP expired", 400));
    }

    const newAddress = new Address({
      ...addressData,
      user,
    });
    await newAddress.save();
    delete req.session.pendingAddress;

    res.status(200).json({
      success: true,
      message: "Address verified and added successfully",
      data: newAddress,
    });
  } catch (error) {
    next(error);
  }
};

export const resendOtp = async (req, res, next) => {
  try {

    if (!req.session.pendingAddress) {
      return next(
        new CustomError("Session expired or no OTP request found", 400)
      );
    }
    const { otp, otpExpiry } = generateOtp();
    req.session.pendingAddress.otp = otp;

    req.session.pendingAddress.otpExpiry = otpExpiry;

    await sendOtpMob(req.session.pendingAddress.mobilePhone, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addQuestion = async (req, res, next) => {
  try {
    const {isCheck }= req.body;
    if (typeof isCheck !== "boolean") {
      return next(new CustomError("Question cannot be false", 400));
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    user.isQuestion = isCheck;

    await user.save();
    return res.status(201).json({ msg: "question form is success" });
  } catch (error) {
    next(error);
  }
};

export const updateUserData = async (req, res, next) => {
  try {
    const { firstName, lastName, email, mobile, location } = req.body;

    // Validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, and email are required",
      });
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const existingUser = await User.findById(req.user.id);


    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    // Prepare update data
    const updateData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      mobile: mobile ? mobile.trim() : "",
      location: {
        state: location?.state ? location.state.trim() : "",
        area: location?.area ? location.area.trim() : "",
      },
    };

    // Update user
    const updatedUser = await User.findByIdAndUpdate(existingUser, updateData, {
      new: true,
      runValidators: true,
    }).select("-password -otp -otpExpiry");



    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }

    // Handle duplicate key error (email)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
}