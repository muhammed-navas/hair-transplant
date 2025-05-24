import { Router } from "express";
import multer from "multer";
const adminRouter=Router();
import { addProduct } from "../controllers/adminController.js";
const storage=multer.memoryStorage();
const upload=multer({storage:storage});

adminRouter.post("/add-product",upload.single("image"),addProduct);


export default adminRouter;