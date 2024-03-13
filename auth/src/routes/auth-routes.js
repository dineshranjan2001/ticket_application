const { Router } = require("express");
const { body } = require("express-validator");
const {registerUser, signinUser, getCurrentUser}=require("../controllers/auth-controller");
const validateRequest = require("../middlewares/error-handler-middleware");
const { MESSAGE } = require("../utils/constants");
const verifyToken = require("../middlewares/auth-middleware");

const router = Router();

router.post("/signup", [
  body("email").isEmail().withMessage(MESSAGE.INVALID_EMAIL),
  body("email").isEmpty().withMessage(MESSAGE.EMAIL_REQUIRED),
  body("password").trim().isLength({min:4,max:10}).withMessage(MESSAGE.INVALID_PASSWORD),
  body("password").isEmpty().withMessage(MESSAGE.PASSWORD_REQUIRED)
],
validateRequest,
registerUser);

router.post("/signin",[
  body("email").isEmail().withMessage(MESSAGE.INVALID_EMAIL),
  body("email").isEmpty().withMessage(MESSAGE.EMAIL_REQUIRED),
  body("password").trim().isLength({min:4,max:10}).withMessage(MESSAGE.INVALID_PASSWORD),
  body("password").isEmpty().withMessage(MESSAGE.PASSWORD_REQUIRED)
],
validateRequest,
signinUser
);

router.get("/current-user",verifyToken,getCurrentUser);


module.exports={router};
