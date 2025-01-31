import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { add, getAll, getOne, remove, update } from "../controller/productController.js";

const productRoutes = express.Router();

productRoutes.post("/add", verifyToken, add);
productRoutes.get("/get-all", verifyToken, getAll);
productRoutes.get("/get-one/:id", verifyToken, getOne);
productRoutes.patch("/update", verifyToken, update);
productRoutes.delete("/delete", verifyToken, remove);

export default productRoutes;
