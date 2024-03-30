import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const wishlistSchema = new Schema({
  image: String,
  model: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
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

const Wishlist = model("Wishlist", wishlistSchema);

export default Wishlist;
