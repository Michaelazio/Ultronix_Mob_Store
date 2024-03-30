import ProfilePicture from "../../../models/users/profilePicture.js";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";



const __dirname = dirname(fileURLToPath(import.meta.url));

export const deleteProfilePic = async (req, res) => {
  try {
    const { userId } = req.user;
    const { image } = req.params;
    const foundImgageAndDeleted = await ProfilePicture.findOneAndDelete({
      userId,
      image,
    });
    if (!foundImgageAndDeleted) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    } else {
      const dirPath = join(
        __dirname,
        `../../../client/images/${image}`
      );
      if (fs.existsSync(dirPath)) {
        try {
          fs.unlinkSync(dirPath);
          return res.status(200).json({
            success: true,
            message: "Deletion is Successful",
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Failed to delete image",
            error: error.message,
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "File not found",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
