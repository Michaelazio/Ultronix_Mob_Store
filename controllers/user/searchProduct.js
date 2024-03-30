import ProductModel from "../../models/products/index.js";

export const searchProduct = async ({ model, brand }) => {
  try {
   
    const searchedItem = await ProductModel.findOne({ model, brand });
    console.log(searchedItem);
    if (searchedItem) {
      return searchedItem;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
