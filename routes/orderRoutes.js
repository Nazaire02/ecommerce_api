import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { add, getAll, getOne, remove, update } from "../controller/categoryController.js";

const orderRoutes = express.Router();

orderRoutes.post("/add", verifyToken, add);
orderRoutes.get("/get-all", verifyToken, getAll);
orderRoutes.get("/get-all-user", verifyToken, getAll);
orderRoutes.get("/get-one/:id", verifyToken, getOne);
orderRoutes.patch("/update", verifyToken, update);
orderRoutes.delete("/delete", verifyToken, remove);

export default orderRoutes;
