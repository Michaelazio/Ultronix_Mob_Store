import User from "../../../models/users/index.js";


export const passwordCheckingHandler = async(req,res)=>{
   try {
    const {userId} = req.user; 
    const {password} = req.body; 
    const userFoundById = await User.findById(userId);
    if(!userFoundById){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    };
    const isPasswordChecked = await userFoundById.checkPassword(password);
    if(!isPasswordChecked){
        return res.status(403).json({
            success: true,
            message: "Unauthorized Access"
        })
    }
    return res.status(200).json({
        success: true,
        message: "User Password Matched"
    })
   } catch (error) {
    return res.status(500).json({error})
   }
}