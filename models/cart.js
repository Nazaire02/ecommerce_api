const mongoose = require("mongoose");
const {Schema} = mongoose;

const cartSchema = new Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        items: [
            {
                product:{type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
                quantity: { type: Number, required: true, default: 1 },
            },
        ]
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;