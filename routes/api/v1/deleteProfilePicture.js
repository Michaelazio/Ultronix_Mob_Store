import ProfilePicture from "../../../models/users/profilePicture.js";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const deleteProfilePicture = async (req, res) => {
  try {
    const { image } = req.params;
    const { userId } = req.user;

    const isImageDeleted = await ProfilePicture.findOneAndDelete({
      userId,
      image,
    });
    if (!isImageDeleted) {
      return res.status(404).json({
        success: false,
        message: "Bad Request",
      });
    }
    const filePath = join(__dirname, "../../../client/images");
    const fullImagePath = join(filePath, image)

    if (fs.existsSync(join(fullImagePath))) {
      try {
        fs.unlinkSync(join(fullImagePath));
        return res.status(200).json({
          success: true,
          message: "Deletion Successful !",
        });
      } catch (error) {
        return res.status(404).json({ error });
      }
    } else {
        return res.status(500).json({
            success: false,
            massege: "Server Couldn't Delete the Image File"
        })
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
