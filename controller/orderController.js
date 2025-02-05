import { Order, ORDER_STATUS } from "../models/order.js";
import User from "../models/user.js";

export async function add(req, res) {
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

export async function getAll(req, res) {
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

export async function getAllByUser(req, res) {
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