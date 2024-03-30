import ProductModel from "../../../models/products/index.js";

export const getProductByModelHandler = async (req, res) => {
  try {
    const { model } = req.params;
    const modelData = await ProductModel.findOne({ model });

    if (!modelData) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    return res.status(200).json({
      success: true,
      model: modelData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
