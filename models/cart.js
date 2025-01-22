import mongoose from "mongoose";
const {Schema} = mongoose;

const cartSchema = new Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        items: [
            {
                productId:{type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
                quantity: { type: Number, required: true, default: 1 },
                price: { type: Number, required:true }
            },
        ]
    },
    {
        timestamps: true
    }
)