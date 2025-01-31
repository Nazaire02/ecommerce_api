import mongoose from "mongoose";
const {Schema} = mongoose; 

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref:'Category', required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        stock: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)
export default Product;