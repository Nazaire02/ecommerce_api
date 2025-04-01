const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const { add, getAll, getAllByUser, getOne, remove, update } = require("../controller/categoryController.js");

const categoryRoutes = express.Router();

categoryRoutes.post("/add", verifyToken, add);
categoryRoutes.get("/get-all", verifyToken, getAll);
categoryRoutes.get("/get-all-by-user", verifyToken, getAllByUser);
categoryRoutes.get("/get-one/:id", verifyToken, getOne);
categoryRoutes.patch("/update", verifyToken, update);
categoryRoutes.delete("/delete", verifyToken, remove);

module.exports = categoryRoutes;
