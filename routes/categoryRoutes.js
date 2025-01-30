import mongoose from "mongoose";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { add, getAll, getOne } from "../controller/categoryController.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/add", verifyToken, add);
categoryRoutes.get("/get-all", verifyToken, getAll);
categoryRoutes.get("/get-one/:id", verifyToken, getOne);
categoryRoutes.patch("/update", verifyToken);
categoryRoutes.delete("/delete", verifyToken);

export default categoryRoutes;
