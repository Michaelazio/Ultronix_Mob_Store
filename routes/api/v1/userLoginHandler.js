import User from "../../../models/users/index.js";
import { jwtSign } from "../../../utils/JWTsign.js";

export const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const matched = await user.checkPassword(password);
      if (matched) {
        await user.updateLoggedIn();
        const secretKey = process.env.JWT_PRIVATE_KEY;
        const token = await jwtSign(
          {
            userId: user._id,
            firstNm: user.firstNm,
            email: user.email,
          },
          secretKey
        );
        return res.status(200).json({
          user,
          token,
        });
      } else {
        return res.status(403).json({
          success: false,
          message: "Invalid Inputs",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Faild to Login",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};
