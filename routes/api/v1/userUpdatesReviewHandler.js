import Review from "../../../models/users/review.js";

export const userUpdatesReviewHandler = async (req, res) => {
  try {
    const { userId } = req.user;
    const { model } = req.params;
    const { title, description, rating } = req.body;
    const foundReview = await Review.findOne({ model });
    console.log(foundReview);
    if (!foundReview) {
      return res.status(404).send({
        success: false,
        message: "Review on this Product Doesn't Exist",
      });
    }
    const updatedReview = await Review.findOneAndUpdate(
      { userId },
      { title, description, rating },
      { new: true }
    )
      .populate("userId", "firstNm _id")
      .populate("productId", "model brand");
    console.log(updatedReview);
    if (!updatedReview) {
      return res.status(404).send({
        success: faild,
        message: "Review Updation Faild",
      });
    }
    return res.status(200).send({
      updatedReview,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
