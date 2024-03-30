import Wishlist from "../../../models/wishlist/index.js";

export const userDeletesWishlistHandler = async (req, res) => {
  try {
    const { model} = req.body;
    const lookForProduct = await  Wishlist.findOne({model})
    if(!lookForProduct){
      return res.status(403).json({
        success: true,
        message: 'Product is not in the Wishlist'
      })
    }
    const deletedWishlist = await Wishlist.findOneAndDelete({model});
    if (deletedWishlist) {
      console.log(deletedWishlist);
      return res.status(200).json({
        success: true,
        message: "Deletation is Successfull!",
      });
    } else {
      console.log(deletedWishlist);
      return res.status(404).json({
        success: false,
        message: "Error in Id",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Encountered a Problem",
    });
  }
};
