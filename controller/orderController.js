
const {Order, ORDER_STATUS} = require("../models/order.js");
const User = require("../models/user.js");
const Cart = require("../models/cart.js");

async function add(req, res) {
    const userId = req.userId;
    try {
        const {products} = req.body;

        const total = products.reduce(
            (totalPrice, product)=> totalPrice + product.quantity * product.priceUnit,
            0
        )

        const newOrder = new Order({
            user: userId,
            total,
            products,
            status: ORDER_STATUS.PENDING
        })
        await newOrder.save();

        await Cart.findOneAndUpdate(
            {user: userId},
            {
                items:[]
            }
        );
        
        return res.status(201).json({
            isSucces: true,
            message: "Succès"
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error creating order"
        });
    }
}

async function getAll(req, res) {
    try {
        const user = await User.findById(req.userId)

        if (user.role !== "admin") {
            return res.status(403).json({
                isSucces: false,
                message: "Unauthorized"
            });
        }

        const orders = await Order.find();
        return res.status(201).json({
            isSucces: true,
            orders
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error getting orders"
        });
    }
}

async function getAllByUser(req, res) {
    try {
        const orders = await Order.find({user: req.userId});
        return res.status(201).json({
            isSucces: true,
            orders
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error getting orders"
        });
    }
}

async function getOne(req, res) {
    try {
        const order = await Order.findById(req.params.id);
        return res.status(201).json({
            isSucces: true,
            order
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error getting order"
        });
    }
}

async function update(req, res) {
    try {
        const {products, status} = req.body;
        const total = products?.reduce((totalPrice, product) => totalPrice + product.quantity * product.priceUnit, 0)
        const orderUpdated = await Order.findOneAndUpdate(
            {_id: req.params.id},
            {
                products, 
                status,
                total
            },
            { new: true, runValidators: true}
        );
        return res.status(201).json({
            isSucces: true,
            orderUpdated
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error updating order"
        });
    }
}

async function remove(req, res) {
    try {
        await Order.findOneAndUpdate(
            {_id: req.params.id},
            {
                status: ORDER_STATUS.CANCELED,
            },
            { new: true, runValidators: true}
        );
        return res.status(201).json({
            isSucces: true,
            message:"success"
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error deleting order"
        });
    }
}

module.exports = {
    add,
    getAll,
    getAllByUser,
    getOne,
    update,
    remove
}
