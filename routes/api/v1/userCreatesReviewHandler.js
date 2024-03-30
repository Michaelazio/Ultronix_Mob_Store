import Review from "../../../models/users/review.js";

export const userCreatesReviewHandler = async (req, res) => {
  try {
    const { userId } = req.user;
    const {model} = req.params;
    const { title, description, rating } = req.body;
    const doesReviewExist = await Review.findOne({ model, userId });
    if (!doesReviewExist) {
      const post = await Review.create({
        userId,
        model,
        title,
        description,
        rating,
        isApproved: true,
      });
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Review Creation Faild",
        });
      } else {
        return res.status(201).json({
          success: true,
          postData: post,
          reviewId: post._id,
          message: "Review Submited"
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Review for this Product Already Exists",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
