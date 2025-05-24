import uploadIcon from "../config/cloudinary.js";
import Product from "../models/Product.js";
import CustomError from "../utils/customError.js";



export const addProduct = async (req, res) => {
    try {
        console.log("req.body:",req.body)
        const { name, description, price } = req.body;
        

        if (!name || !description || !price ) {
            return next(new CustomError("all fields required", 400));
        }

        if (!req.file) {
            return next(new CustomError("image is required", 400));
        }

        const imageUrl = await uploadIcon(req.file.buffer);

        
        const newProduct = new Product({
            name,
            description,
            price,
            image: imageUrl
        });

        
        await newProduct.save();

        res.status(201).json({
            message: "Product added successfully",
        });

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};