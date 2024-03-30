import Review from "../../../models/users/review.js";


export const userDeletesReviewHandler = async(req, res) =>{
   try {
    const {model} = req.params;
    const {userId} = req.user
    const deleted = await Review.findOneAndDelete({model, userId});
    if(!deleted){
        return res.status(404).send({
            success: false,
            message: "Deletation Faild"
        })
    }else {
        return res.status(200).send({
            success: true,
            message: "Deletation is Successfull!",
            reviewId: deleted._id
        })
    }
   } catch (error) {
     console.log(error);
     return res.status(500).json({ success: false, error });
   }
}