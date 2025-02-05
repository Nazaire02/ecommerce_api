import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {  getOne, remove, update } from "../controller/categoryController.js";
import { add, getAll, getAllByUser } from "../controller/orderController.js";

const orderRoutes = express.Router();

orderRoutes.post("/add", verifyToken, add);
orderRoutes.get("/get-all", verifyToken, getAll);
orderRoutes.get("/get-all-by-user", verifyToken, getAllByUser);
orderRoutes.get("/get-one/:id", verifyToken, getOne);
orderRoutes.patch("/update/:id", verifyToken, update);
orderRoutes.delete("/delete/:id", verifyToken, remove);

export default orderRoutes;
