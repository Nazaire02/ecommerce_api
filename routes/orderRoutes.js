const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const { add, getAll, getAllByUser, getOne, update, remove } = require("../controller/orderController.js");

const orderRoutes = express.Router();

orderRoutes.post("/add", verifyToken, add);
orderRoutes.get("/get-all", verifyToken, getAll);
orderRoutes.get("/get-all-by-user", verifyToken, getAllByUser);
orderRoutes.get("/get-one/:id", verifyToken, getOne);
orderRoutes.patch("/update/:id", verifyToken, update);
orderRoutes.delete("/delete/:id", verifyToken, remove);

module.exports = orderRoutes;
