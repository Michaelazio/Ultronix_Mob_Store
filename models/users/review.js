import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    required: true,
  },
});

const Review = model("Review", reviewSchema);
export default Review;
