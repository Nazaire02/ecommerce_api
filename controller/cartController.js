import Cart from "../models/cart.js";

export async function getAll(req, res) {
    try {
        const carts = await Cart.find({items: {$exists: true, $not: { $size: 0 }}})
                                .populate("user")
                                .populate("items.product");

        return res.status(200).json({
            isSucces: true,
            carts,
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error getting carts"
        });
    }
}