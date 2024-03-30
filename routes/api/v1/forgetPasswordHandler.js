import User from "../../../models/users/index.js";
import bcrypt from "bcrypt";

export const forgetPasswordHandler = async (req, res) => {
  try {
    const { email, primaryPhone, password } = req.body;

    const user = await User.findOne({ email, primaryPhone });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access!",
      });
    } else {
      const hashedPassword =  bcrypt.hashSync(password,10)
      const updatePassword = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword } 
      );
      if (!updatePassword) {
        return res.status(404).json({
          success: false,
          message: "Password Update Unsuccessful!",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Password Successfully Updated!",
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
