import ProfilePicture from "../../../models/users/profilePicture.js";

export const getPicture = async(req, res) => {
 try {
    const {userId} = req.user;
    // const {image} = req.params;
    const profilePic = await ProfilePicture.findOne({userId});
    if(!profilePic){
        return res.status(404).json({
            success: false,
            message: "Faild to get the pictures"
        })
    }
    return res.status(200).json({
        success: true,
        profilePic
    })
 } catch (error) {
    return res.status(500).json({
        error: error,
        success: false
    })
 }
}