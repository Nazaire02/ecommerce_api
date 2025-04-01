const express = require('express');
const { getAll, login, register, deleteUser } = require('../controller/userController.js');
const verifyToken = require('../middlewares/verifyToken.js');

const userRoutes = express.Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/get-all',verifyToken, getAll);
userRoutes.delete('delete/:id', deleteUser)

module.exports = userRoutes;

