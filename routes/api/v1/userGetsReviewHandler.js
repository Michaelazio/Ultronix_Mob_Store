import Review from "../../../models/users/review.js";

export const userGetsReviewHandler = async (req, res) => {
  try {
    const { model } = req.params;
    const allReviews = await Review.find({ model }).populate(
      "userId",
      "firstNm lastNm"
    );
    if (!allReviews) {
      return res.status(404).json({
        success: false,
        message: "Reviews Not Found",
      });
    } else {
      return res.status(201).json({
        success: true,
        reviews: allReviews,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
