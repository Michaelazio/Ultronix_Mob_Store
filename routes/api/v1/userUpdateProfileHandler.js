import User from "../../../models/users/index.js";
import bcrypt from "bcrypt";

export const userUpdateProfileHandler = async (req, res) => {
  try {
    const { lastNm, address, email, primaryPhone, secondaryPhone, password } = req.body;
    const { userId } = req.user;
    console.log({userId});
    const hashedPassword =  bcrypt.hashSync(password, 10);
    const updatedUserData = await User.findByIdAndUpdate(
        userId,
        { lastNm, address, email, primaryPhone, secondaryPhone, password: hashedPassword },
        { new: true }
      );
    if (!updatedUserData) {
      return res.status(404).json({
        success: false,
        message: "No User Such Found",
      });
    } else {
        return res.status(200).json({
            success: true,
            updatedUserData,
          });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
