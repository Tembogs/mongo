import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number
    }],
    total: Number,
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending"
    }
});

const Order = mongoose.model("Order", orderSchema)

export default Order