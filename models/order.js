const mongoose = require("mongoose");
const {Schema} = mongoose;

const ORDER_STATUS = {
   CANCELED: "canceled",
   PENDING: "pending",
   SHIPPED: "shipped",
 };
 

const orderSchema = new Schema(
     {
         user: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},
         products: [
            {
               product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true},
               quantity: { type: Number, required: true, default: 1},
               priceUnit: { type: Number, required: true}
            }
         ],
         status: {
            type: String, 
            required: true,
            enum: ["canceled", "pending", "shipped"]
         },
         total: { type: Number, required: true}
     },
     {
        timestamps: true
     }
)

const Order = mongoose.model('Order', orderSchema)
module.exports = { Order, ORDER_STATUS };