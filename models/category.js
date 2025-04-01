const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        label: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref:"user", required: true}
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category;