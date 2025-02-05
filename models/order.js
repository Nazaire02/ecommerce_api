import mongoose from "mongoose";
const {Schema} = mongoose;

const orderSchema = new Schema(
     {
         user: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},
         products: [
            {
               product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true},
               quantity: { type: Number, required: true, default: 1},
               priceUnit: { type: String, required: true}
            }
         ]
     },
     {
        timestamps: true
     }
)

const Order = mongoose.model('Order', orderSchema)
export default Order;