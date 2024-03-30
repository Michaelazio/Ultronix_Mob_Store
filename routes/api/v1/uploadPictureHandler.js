import { join, dirname } from "path";

import { fileURLToPath } from "url";

import ProfilePicture from "../../../models/users/profilePicture.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const uploadPictureHandler = async (req, res) => {
  try {
    const imageFile = req.file.filename;
    const { userId } = req.user;

    const existPic = await ProfilePicture.findOne({ userId });
    if (existPic) {
      const foundAndReplaced = await ProfilePicture.findOneAndReplace(
        { userId },
        { userId, image: imageFile }
      );
      if (!foundAndReplaced) {
        return res.status(404).json({
          massege: "Upload Faild",
          success: false,
        });
      }
      return res.status(201).send(imageFile);
    } else {
      const uploadation = await ProfilePicture.create({
        image: imageFile,
        userId,
      });

      if (!uploadation) {
        return res.status(400).json({
          massege: "Uploadation Faild",
        });
      }

      return res.status(200).send(imageFile);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
