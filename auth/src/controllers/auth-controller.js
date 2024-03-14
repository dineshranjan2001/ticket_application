const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const {
  findUserByEmail,
  saveUser,
  doCheckOutSignout,
} = require("../services/auth-service");
const { ApiResponse } = require("../utils/apiResponse");
const { verifyPassword } = require("../utils/auth-crypto");
const { HTTPSTATUS, MESSAGE, STATUS } = require("../utils/constants");

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // check the user is exist or not
    const exitedUser = await findUserByEmail(email);
    // validate the existed user
    if (exitedUser) {
      return res.status(HTTPSTATUS.INTERNALSERVERERROR).json({
        errors: new ApiError(
          HTTPSTATUS.INTERNALSERVERERROR,
          new Date().toISOString(),
          MESSAGE.FOUND
        ),
      });
    }

    // save the new user
    const savedUser = await saveUser(email, password);
    console.log(process.env.ACCESS_TOKEN_SECRET);

    // validate the saved user if it correctly saved or not
    if (!savedUser) {
      return res
        .status(HTTPSTATUS.INTERNALSERVERERROR)
        .json(
          new ApiResponse(
            STATUS.FAILED,
            HTTPSTATUS.INTERNALSERVERERROR,
            MESSAGE.NOTSAVED,
            {},
            new Date().toISOString()
          )
        );
    }
    return res
      .status(HTTPSTATUS.CREATED)
      .json(
        new ApiResponse(
          STATUS.SUCCESS,
          HTTPSTATUS.CREATED,
          MESSAGE.SAVED,
          savedUser,
          new Date().toISOString()
        )
      );
  } catch (error) {
    console.log(error);
    return res.status(HTTPSTATUS.INTERNALSERVERERROR).json({
      errors: new ApiError(
        HTTPSTATUS.INTERNALSERVERERROR,
        new Date().toISOString(),
        error?.message
      ),
    });
  }
});

const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    //check the user is exist or not
    const exitedUser = await findUserByEmail(email);

    // validate the existing user
    if (!exitedUser) {
      return res.status(HTTPSTATUS.BADREQUEST).json({
        errors: new ApiError(
          HTTPSTATUS.BADREQUEST,
          new Date().toISOString(),
          MESSAGE.INVALIDCREDENTIALS
        ),
      });
    }

    // check the password
    const passwordStatus = await verifyPassword(password, exitedUser?.password);
    // validate the password
    if (!passwordStatus) {
      return res.status(HTTPSTATUS.BADREQUEST).json({
        errors: new ApiError(
          HTTPSTATUS.BADREQUEST,
          new Date().toISOString(),
          MESSAGE.MISMATCHED
        ),
      });
    }

    // generate the token
    const userToken = jwt.sign(
      {
        id: exitedUser.id,
        email: exitedUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    // set the token into a cookie
    req.session = {
      token: userToken,
    };

    return res.status(HTTPSTATUS.OK).json(
      new ApiResponse(
        STATUS.SUCCESS,
        HTTPSTATUS.OK,
        MESSAGE.LOGGEDIN,
        {
          id: exitedUser.id,
          email: exitedUser.email,
        },
        new Date().toISOString()
      )
    );
  } catch (error) {
    console.log(error);
    return res.status(HTTPSTATUS.INTERNALSERVERERROR).json({
      errors: new ApiError(
        HTTPSTATUS.INTERNALSERVERERROR,
        new Date().toISOString()
      ),
    });
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  res
    .status(HTTPSTATUS.OK)
    .json(
      new ApiResponse(
        STATUS.SUCCESS,
        HTTPSTATUS.OK,
        MESSAGE.FETCHED,
        currentUser || null,
        new Date().toISOString()
      )
    );
});

const signoutUser = asyncHandler(async (req, res) => {
  const checkSignOutStatus = await doCheckOutSignout(req);
  return (checkSignOutStatus)
    ? res
        .status(HTTPSTATUS.OK)
        .json(
          new ApiResponse(
            STATUS.SUCCESS,
            HTTPSTATUS.OK,
            MESSAGE.LOGGEDOUT,
            req?.user,
            new Date().toISOString()
          )
        )
    : res
        .status(HTTPSTATUS.INTERNALSERVERERROR)
        .json(
          new ApiResponse(
            STATUS.FAILED,
            HTTPSTATUS.INTERNALSERVERERROR,
            MESSAGE.LOGGEDOUT_FAILED,
            req?.user,
            new Date().toISOString()
          )
        );
});

module.exports = { registerUser, signinUser, getCurrentUser, signoutUser };
