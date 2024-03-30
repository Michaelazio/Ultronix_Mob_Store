import Wishlist from "../../../models/wishlist/index.js";

export const wishlistStoringHandler = async (req, res) => {
  try {
    const { image, model, brand, price } = req.body;
    const {userId} = req.user; 
    console.log(userId)
    const existingModel = await Wishlist.findOne({model});
    if(existingModel){
      return res.status(404).json({
        message: "This already exists"
      })
    }
    const wishlistCreated = await Wishlist.create({
      image,
      model,
      brand,
      price,
      userId
    });
    if (wishlistCreated) {
      return res.status(201).json({
        success: true,
        wishlist: wishlistCreated
      });
    } else {
      console.log(wishlistCreated);
      return res.status(404).json({
        success: false,
        message:
          "Faild to store the wishlists data, datas didn't match the Schema",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Problem!",
    });
  }
};
