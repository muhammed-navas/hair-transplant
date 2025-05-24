import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import CustomError from "../utils/customError.js";
import Stock from "../models/Stock.js";
import { generateOtp } from "../helpers/otpHelper.js";
import {v4 as uuidv4} from 'uuid';
import { sendOtpMob } from "../utils/sendOtpMob.js";
import Address from "../models/Address.js";
export const getProductData = async (req, res) => {
    try {
        const products = await Product.find();
      
        
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found in database" });
        }
        
        return res.status(200).json({
            message: "Products retrieved successfully",
            products: products 
        });

    } catch (error) {

        console.error('Error retrieving products:', error);
        return res.status(500).json({ message: "Error retrieving products", error: error.message });

    }
};

export const addToCart = async (req, res, next) => {

  try {
    console.log("req.body:",req.body);
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return next(new CustomError("Product ID and quantity are required", 404));
    }



    const stock=await Stock.findOne({product:productId});
    console.log("stock::",stock)

    if(!stock || stock.quantity < quantity){
      return next(new CustomError('insufficient stock available',400));
    }



    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {

      cart = new Cart({ user: req.user.id, items: [] });
      
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      
      cart.items.push({ product: productId, quantity });
    }
    
    stock.quantity -= quantity;
    await stock.save();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      addedProduct:productId,
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
      path: 'items.product',
      select: 'name price',
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

    cartData.items.forEach(item => {
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

    console.log("cartData:", cartData);

    return res.status(200).json({
      success: true,
      message: "Cart data fetched successfully",
      cartData: cartData
    });
  } catch (error) {
    next(error);
  }
};



  export const removeFromCart = async (req, res, next) => {
    try {
      const { productId } = req.body;
      
  
      if (!productId) {
        return next(new CustomError('Product ID is required', 400));
      }
  
      const cart = await Cart.findOne({ user: req.user.id });
      
      if (!cart) {
        return next(new CustomError('Cart not found', 404));
      }
  
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        
        const stock = await Stock.findOne({ product: productId });
        stock.quantity += cart.items[itemIndex].quantity;
        await stock.save();
  
        
        cart.items.splice(itemIndex, 1);
        await cart.save();
      }
  
      res.status(200).json({
        success: true,
        message: 'Product removed from cart successfully',
        
      });
    } catch (error) {
      next(error);
    }
  };

export const checking = async ( req,res,next)=>{
  console.log(req.body,'-------------------')
}


export const increaseQuantity = async (req, res, next) => {
  try {
    const { productId, newQuantity } = req.body;

    if (!productId || newQuantity <= 0) {
      return next(new CustomError('Product id and valid quantity are required', 400));
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return next(new CustomError('Cart not found', 404));
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return next(new CustomError('Product not found in cart', 404));
    }

    const stock = await Stock.findOne({ product: productId });
    if (!stock) {
      return next(new CustomError('Stock information not found', 404));
    }

    if (stock.quantity < (newQuantity - cart.items[itemIndex].quantity)) {
      return next(new CustomError('Insufficient stock to increase the quantity', 400));
    }

    stock.quantity -= (newQuantity - cart.items[itemIndex].quantity);
    cart.items[itemIndex].quantity = newQuantity;

    await cart.save();
    await stock.save();

    res.status(200).json({
      success: true,
      message: "Product quantity increased successfully",
      cart
    });
  } catch (error) {
    next(error);
  }
};

export const decreaseQuantity = async (req, res, next) => {
  try {
    const { productId, newQuantity } = req.body;

    if (!productId || newQuantity <= 0) {
      return next(new CustomError('Product id and valid quantity are required', 400));
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return next(new CustomError('Cart not found', 404));
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return next(new CustomError('Product not found in cart', 404));
    }

    if (newQuantity >= cart.items[itemIndex].quantity) {
      return next(new CustomError('New quantity must be less than the current quantity', 400));
    }

    const stock = await Stock.findOne({ product: productId });
    if (!stock) {
      return next(new CustomError('Stock information not found', 404));
    }

    stock.quantity += (cart.items[itemIndex].quantity - newQuantity);
    cart.items[itemIndex].quantity = newQuantity;

    await cart.save();
    await stock.save();

    res.status(200).json({
      success: true,
      message: "Product quantity decreased successfully",
      cart
    });
  } catch (error) {
    next(error);
  }
};

export const addAddress=async(req,res,next)=>{
  try{
    const{email,firstName,lastName,address,city,postcode,mobilePhone,landmark}=req.body;
    console.log("landMark:",landmark);
    
    if(!email||!firstName || !lastName ||!address||!city||!postcode|| !mobilePhone){
      return next(new CustomError('All fields required',400));
    }
    const userId = req.user.id;
    if(!userId){
      return next(new CustomError('userId required',404));
    }
    const {otp,otpExpiry}=generateOtp();
    console.log("otppppppppppp:",otp);
    const key=uuidv4();

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
      otpExpiry
    };
    req.session.pendingAddress = pendingAddress;
    console.log("req.session.pendingAddress:",req.session.pendingAddress);
    await sendOtpMob(mobilePhone,otp);
    
    res.status(200).json({
      success:true,
      message:'OTP sent successfully. Please verify to add the address',

    })

  }catch(error){
    next(error)
  }
}


export const verifyOtp=async(req,res,next)=>{
  try {
    console.log("reached herererere");
    console.log("req.body:",req.body);
     const user=req.user.id;
    const{otp}=req.body;
    console.log("otp:",otp);
    
    if(!req.session.pendingAddress){
      return next(new CustomError('Session expired or no OTP request found',400));
    };
    const { otp: sessionOtp, otpExpiry, ...addressData } = req.session.pendingAddress;
    
    if (otp !== sessionOtp) {
      return next(new CustomError('Invalid OTP', 400));
    }

    if (Date.now() > otpExpiry) {
      return next(new CustomError('OTP expired', 400));
    }

 
    const newAddress = new Address({
      ...addressData,
      user,
    });
   await newAddress.save();
    delete req.session.pendingAddress;

    res.status(200).json({
      success: true,
      message: 'Address verified and added successfully',
      data: newAddress,
    });
  } catch (error) {
    next(error);
  }
};


export const resendOtp=async(req,res,next)=>{
  try {
    console.log("reached here");
    if (!req.session.pendingAddress) {
      return next(new CustomError('Session expired or no OTP request found', 400));
    }
    const { otp, otpExpiry } = generateOtp();
    req.session.pendingAddress.otp = otp;
    
    req.session.pendingAddress.otpExpiry = otpExpiry;
    console.log("req.pendingAddress.mobilePhone:",req.session.pendingAddress);
    await sendOtpMob(req.session.pendingAddress.mobilePhone,otp);
  
    res.status(200).json({
      success:true,
      message:"OTP sent Successfully"
    })
  } catch (error) {
    next(error)
  }  
}