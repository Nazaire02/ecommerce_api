import { Order, ORDER_STATUS } from "../models/order.js";

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