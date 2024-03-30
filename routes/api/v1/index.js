import { Router } from "express";
import { userSignupHandler } from "./userSignupHandler.js";
import { getAllProductsHandler } from "./getAllProductsHandler.js";
import { getProductByModelHandler } from "./getProductByModelHandler.js";
import { getProductByBrandHandler } from "./getProductByBrandHandler.js";
import { wishlistStoringHandler } from "./wishlistStoringHandler.js";
import { userSpecificWishlistHandler } from "./userSpecificWishlistHandler.js";
import { userDeletesWishlistHandler } from "./userDeletesWishlistHandler.js";
import { ordersStoringHandler } from "./orderStoringHandler.js";
import { userSpecificOrdersHandler } from "./userSpecificOrdersHandler.js";
import { userLoginHandler } from "./userLoginHandler.js";
import { userUpdateProfileHandler } from "./userUpdateProfileHandler.js";
import { userCreatesReviewHandler } from "./userCreatesReviewHandler.js";
import { userGetsReviewHandler } from "./userGetsReviewHandler.js";
import { userUpdatesReviewHandler } from "./userUpdatesReviewHandler.js";
import { userDeletesReviewHandler } from "./userDeletesReviewHandler.js";
import {
  signupUserValidation,
  loginValidation,
  storeReviewValidation,
} from "../../../utils/validation.js";

import { passwordCheckingHandler } from "./passwordCheckingHandler.js";
import protectApi from "../../../utils/protectApi.js";
import { giveMeDiscountHandler } from "./giveMeDiscountHandler.js";
import { allProductsHandler } from "./allProductsHandler.js";
import { multerMiddleWare } from "../../../utils/multer.js";
import { uploadPictureHandler } from "./uploadPictureHandler.js";
import { getProfilePicture } from "./getProfilePicture.js";
import { deleteProfilePicture } from "./deleteProfilePicture.js";
import { forgetPasswordHandler } from "./forgetPasswordHandler.js";


// Api Router Instance
const apiRouter = Router();

// For User Signup
apiRouter.post("/signup", signupUserValidation, userSignupHandler);
apiRouter.post("/login", loginValidation, userLoginHandler);
apiRouter.patch(
  "/update",
  signupUserValidation,
  protectApi,
  userUpdateProfileHandler
);
apiRouter.post("/password-check", protectApi, passwordCheckingHandler);
apiRouter.patch("/forgot-password", forgetPasswordHandler)


// user should be able to create, update and delete reviews
apiRouter.post(
  "/review/:model",
  protectApi,
  userCreatesReviewHandler
);
apiRouter.get("/review/:model", protectApi, userGetsReviewHandler);
apiRouter.patch(
  "/review/:model",
  storeReviewValidation,
  protectApi,
  userUpdatesReviewHandler
);
apiRouter.delete("/review/:model", protectApi, userDeletesReviewHandler);

// For All Products to get
apiRouter.get("/get-all-products", allProductsHandler)

apiRouter.get("/products", getAllProductsHandler);

// For Getting specific things from the Product
apiRouter.get("/products/brand/:model", getProductByModelHandler);

// For getting Product by Brand
apiRouter.get("/products/:brand", getProductByBrandHandler);

// For Wishlist
apiRouter.post("/wishlist/store", protectApi, wishlistStoringHandler);
apiRouter.get("/wishlist/user", protectApi, userSpecificWishlistHandler);

// This requires the Product's _id
apiRouter.delete("/wishlist/delete", protectApi, userDeletesWishlistHandler);

// For the Order
apiRouter.post("/orders/store", protectApi, ordersStoringHandler);
apiRouter.get("/orders/user", protectApi, userSpecificOrdersHandler);

// For providing Discount
apiRouter.get("/discount", giveMeDiscountHandler)


// For Profile Picture Handling 
apiRouter.post("/profile-picture", protectApi, multerMiddleWare, uploadPictureHandler);
apiRouter.get("/profile-picture", protectApi, getProfilePicture);
apiRouter.delete("/profile-picture/:image", protectApi, deleteProfilePicture)

export { apiRouter };
