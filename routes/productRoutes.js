import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { add, getAll, getOne, remove, update } from "../controller/productController.js";
import upload from "../middlewares/savePicture.js";

const productRoutes = express.Router();

productRoutes.post("/add", verifyToken, upload.single('productImg'), add);
productRoutes.get("/get-all", verifyToken, getAll);
productRoutes.get("/get-one/:id", verifyToken, getOne);
productRoutes.patch("/update", verifyToken, update);
productRoutes.delete("/delete/:id", verifyToken, remove);

export default productRoutes; 
