import Wishlist from "../../../models/wishlist/index.js";

export const userSpecificWishlistHandler = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(userId);
    const userSpecificWishlists = await Wishlist.find({ userId });
    if (userSpecificWishlists) {
      console.log(userSpecificWishlists);
      return res.status(200).send({
        success: true,
        userSpecificWishlists,
        
      });
    } else {
      console.log(userSpecificWishlists);
      return res.stats(404).send({
        success: false,
        message: "There is nothing in the wishlist that user had wished",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server Encountered a Problem while fetching for the data",
    });
  }
};
