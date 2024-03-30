import User from "../../models/users/index.js";


export const userSignup = async ({
  firstNm,
  lastNm,
  email,
  password,
  phone,
  primaryPhone,
  secondaryPhone,
  address,
}) => {
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const newUser = await new User({
        firstNm,
        lastNm,
        email,
        password,
        phone,
        primaryPhone,
        secondaryPhone,
        address,
      }).save();

      return newUser;
    } else {
      return null
    }
  } catch (error) {
    console.log(error);
    throw new error;
  }
};
