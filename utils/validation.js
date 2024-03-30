import { check, validationResult } from "express-validator";

const manageError = (cb) => (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  cb(errors.array(), req, res);
};

export const loginValidation = [
  check("email").isEmail().withMessage(" 'email' is missing or is invalid "),
  check("password").notEmpty().withMessage("'password' is empty"),
  manageError((error, req, res) => res.status(422).json({ error })),
];

// firstNm,lastNm,email,password,phone,primaryPhone,secondaryPhone,address,

export const signupUserValidation = [
  check("password")
    .notEmpty()
    .withMessage("'password' is empty")
    .isLength({ min: 6 })
    .withMessage("'password' must have atleast 6 characters"),

  manageError((error, req, res) => res.status(422).json({ error })),
];

export const storeReviewValidation = [
  check("title").notEmpty().withMessage("title field should not be empty"),
  check("description")
    .notEmpty()
    .withMessage("description field should not be empty"),
  check("user").notEmpty().withMessage("user field should not be empty"),
  manageError((error, req, res) => res.status(422).json({ error })),
];

export const signupAdminValidation = [
  check("firstNm").notEmpty().trim().escape(),
  check("lastNm").notEmpty().trim().escape(),
  check("email").isEmail().notEmpty().trim().escape(),
  check("password").notEmpty().trim().isLength({ min: 6 }),
  check("phone").isNumeric().notEmpty(),
  manageError((error, req, res) => res.redirect(req.originalUrl)),
];

export const loginAdminValidation = [
  check("email").isEmail().notEmpty().trim().escape(),
  check("password").notEmpty().trim().escape(),
  manageError((error, req, res) => res.redirect(req.originalUrl)),
];
