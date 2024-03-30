import jwt from "jsonwebtoken";

export const jwtSign = async(obj, secretKey) => {
  const token =  jwt.sign(obj, secretKey, { expiresIn: "3d"});
  return Promise.resolve(token);
};
