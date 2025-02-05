import Cart from "../models/cart.js";

export async function getAll(req, res) {
    try {
        //get only carts which have items
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

export async function getCartByUser(req, res) {
    try {
        const cart = await Cart.findOne({user: req.userId}) 
                                .populate("user")
                                .populate("items.product");

        return res.status(200).json({
            isSucces: true,
            cart,
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error getting carts"
        });
    }
}

export async function updateItems(req, res) {
    const {items} = req.body;
    try {
        const cartUpdated = await Cart.findOneAndUpdate(
            {user: req.userId},
            {items},
            { new: true, runValidators: true } 
        ) 
        return res.status(200).json({
            isSucces: true,
            cartUpdated,
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error updating cart"
        });
    }
}