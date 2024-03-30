import jwt from "jsonwebtoken";

export const jwtVerify = async (token, secretKey) => {
  const payload = await Promise.resolve(
    jwt.verify(token, secretKey)
  );
  console.log(payload)
  if (!payload) {
    console.log(payload);
    throw new Error("Unauthorized Access");
  }
  return payload;
};
