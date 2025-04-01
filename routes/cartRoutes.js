const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const { getAll, getCartByUser, updateItems } = require("../controller/cartController.js");

const cartRoutes = express.Router();

cartRoutes.get("/get-all", verifyToken, getAll);
cartRoutes.get("/get-user-cart", verifyToken, getCartByUser);
cartRoutes.patch("/update-items", verifyToken, updateItems);

module.exports = cartRoutes;
