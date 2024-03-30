import { Schema, model } from "mongoose";

const productSchema = new Schema({
  available: { type: Number, required: true },
  image: String,
  brand: { type: String, required: true },
  model: { type: String, required: true },
  display: String,
  processor: String,
  memory: String,
  camera: String,
  battery: String,
  connectivity: String,
  operating_system: String,
  features: String,
  dimensions: String,
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
});

const ProductModel = model("Product", productSchema);

export default ProductModel;
