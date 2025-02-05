import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { getAll, getCartByUser, updateItems } from "../controller/cartController.js";

const cartRoutes = express.Router();

cartRoutes.get("/get-all", verifyToken, getAll);
cartRoutes.get("/get-user-cart/:userId", verifyToken, getCartByUser);
cartRoutes.patch("/update-items/:userId", verifyToken, updateItems);

export default cartRoutes;
