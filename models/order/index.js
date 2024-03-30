import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const orderSchema = new Schema({
  camera: String,
  memory: String,
  processor: String,
  model: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number, 
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

const Order = model("Order", orderSchema);

export default Order;