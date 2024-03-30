import { jwtVerify } from "./JWTverify.js";


export default async (req, res, next) => {
    try {
      const auth = req.header("Authorization")
      if (!auth) {
        return res.status(401).json({
          success: false,
          message: "Authorization header is missing"
        });
      }
      
      const token = auth.split(" ")[1]
      const secretKey = process.env.JWT_PRIVATE_KEY
      const verifiedUser = await jwtVerify(token, secretKey);
      if (verifiedUser) {
        req.user = verifiedUser;
        return next();
      } else {
        return res.status(403).json({
          success: false,
          message: "Unauthorized"
        });
      }
    } catch (error) {
     return res.status(500).json({error})
    }
  };
