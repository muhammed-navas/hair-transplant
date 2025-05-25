import uploadIcon from "../config/cloudinary.js";
import Product from "../models/Product.js";
import CustomError from "../utils/customError.js";



export const addProduct = async (req, res,next) => {
    try {
        console.log("req.body:",req.body)
        console.log("req.file:",req.file)
        const { name, description, price, image } = req.body;

        if (!name || !description || !price) {
          return next(new CustomError("All fields are required", 400));
        }

        let imageUrl;

        // Check if file is uploaded
        if (req.file) {
          console.log("Processing uploaded file");
          console.log("req.file.buffer:", req.file.buffer);
          imageUrl = await uploadIcon(req.file.buffer);
        }
        // Check if image URL is provided in body
        else if (image && typeof image === "string" && image.trim()) {
          console.log("Using provided image URL");
          imageUrl = image.trim();
        }
        // No image provided at all
        else {
          return next(
            new CustomError(
              "Image is required (either upload a file or provide image URL)",
              400
            )
          );
        }

        console.log("Final imageUrl:", imageUrl);
        
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