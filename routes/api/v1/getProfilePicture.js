import ProfilePicture from "../../../models/users/profilePicture.js";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const getProfilePicture = async (req, res) => {
  try {
    const { userId } = req.user;

    const imageName = await ProfilePicture.findOne({ userId });
    if(!imageName){
      return res.status(404).json({
        success: false,
        massege: "Picture Doesn't exist!",
      });
    }
    console.log(imageName.image);
    if (!imageName.image) {
      return res.status(404).json({
        success: false,
        massege: "Picture Doesn't exist!",
      });
    } else {
      
      return res.status(200).send(imageName.image);
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
