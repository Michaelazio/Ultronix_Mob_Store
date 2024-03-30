import ProductModel from "../../../models/products/index.js";
import findUniqueArray from "../../../utils/findUniqueArray.js";

export const getAllProductsHandler = async (req, res) => {
 try {
  const products = await ProductModel.find();
  const dataBrands = products.map(i => i.brand)
  const brand =  findUniqueArray(dataBrands)
  if (products) {
    console.log(products)
    return res.status(200).json({
      brands: brand
    });
  } else {
    console.log(
      "Problem in the between server and the database, for fetching the data!"
    );
    return res.status(500).json({
      message: "Problem in Fetching the Data, try again later",
    });
  }
 } catch (error) {
  console.log(error);
  return res.status(500).json({ success: false, error });
 }
};
