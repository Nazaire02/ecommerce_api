import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { add, getAll, getOne } from "../controller/categoryController.js";

const cartRoutes = express.Router();

cartRoutes.get("/get-all", verifyToken, getAll);
cartRoutes.get("/get-one/:id", verifyToken, getOne);
cartRoutes.post("/update-items", verifyToken, add);

export default cartRoutes;
