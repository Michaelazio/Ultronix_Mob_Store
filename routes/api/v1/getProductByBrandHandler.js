import ProductModel from "../../../models/products/index.js";

export const getProductByBrandHandler = async (req, res) => {
  try {
    const { brand } = req.params;
    const brandData = await ProductModel.find({ brand });

    if (brandData.length === 0) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    return res.status(200).json({
      success: true,
      brand: brandData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
