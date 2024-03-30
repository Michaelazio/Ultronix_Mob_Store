import { userSignup } from "../../../controllers/user/userSignup.js";
import { jwtSign } from "../../../utils/JWTsign.js";

export const userSignupHandler = async (req, res) => {
  try {
    const {
      firstNm,
      lastNm,
      email,
      password,
      primaryPhone,
      secondaryPhone,
      address,
    } = req.body;
    const user = await userSignup({
      firstNm,
      lastNm,
      email,
      password,
      primaryPhone,
      secondaryPhone,
      address,
    });

    if (user) {
      const secretKey = process.env.JWT_PRIVATE_KEY;
      const token = await jwtSign(
        {
          userId: user._id,
          firstNm: user.firstNm,
          email: user.email,
        },
        secretKey
      );
      return res.status(201).json({
        success: true,
        message: "User Creation is Successful",
        user: {
          userId: user._id,
          firstNm: user.firstNm,
          email: user.email,
          createdAt: user.createdAt,
        },
        token,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User Already Exists",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
