import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { add, getAll, getAllByUser, getOne, remove, update } from "../controller/categoryController.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/add", verifyToken, add);
categoryRoutes.get("/get-all", verifyToken, getAll);
categoryRoutes.get("/get-all-by-user", verifyToken, getAllByUser);
categoryRoutes.get("/get-one/:id", verifyToken, getOne);
categoryRoutes.patch("/update", verifyToken, update);
categoryRoutes.delete("/delete", verifyToken, remove);

export default categoryRoutes;
