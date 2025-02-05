import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { getAll, getCartByUser, updateItems } from "../controller/cartController.js";

const cartRoutes = express.Router();

cartRoutes.get("/get-all", verifyToken, getAll);
cartRoutes.get("/get-user-cart", verifyToken, getCartByUser);
cartRoutes.patch("/update-items", verifyToken, updateItems);

export default cartRoutes;
