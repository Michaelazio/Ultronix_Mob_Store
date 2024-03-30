import ProfilePicture from "../../../models/users/profilePicture.js";
import fs from "fs";
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));


export const filepath = "src/images/"
export const profilePictureUploadHandler = async (req, res) => {
  const { userId } = req.user;

  if (!req.file || !req.file.filename) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const image = req.file.filename;
  console.log(image)
  console.log(req.file)


  try {
    const picUploaded = await ProfilePicture.create({ image, userId });
    if (!picUploaded) {
      return res.status(404).json({
        success: false,
        message: "Faild to upload image!",
      });
    }

    return res.status(200).json({
      imageData: picUploaded,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
