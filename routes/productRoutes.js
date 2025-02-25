import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { add, getAll, getAllByUser, getOne, remove, toggleStatus, update } from "../controller/productController.js";
import upload from "../middlewares/savePicture.js";

const productRoutes = express.Router();

productRoutes.post("/add", verifyToken, upload.single('productImg'), add);
productRoutes.get("/get-all", verifyToken, getAll);
productRoutes.get("/get-all-by-user", verifyToken, getAllByUser);
productRoutes.get("/get-one/:id", verifyToken, getOne);
productRoutes.patch("/update/:id", verifyToken,upload.single('productImg'), update);
productRoutes.delete("/delete/:id", verifyToken, remove);
productRoutes.patch("/toggle-status/:id", verifyToken, toggleStatus);

export default productRoutes; 
