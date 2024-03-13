const { validationResult } = require("express-validator");
const ApiError = require("../utils/apiError");
const { HTTPSTATUS } = require("../utils/constants");

const validateRequest = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(HTTPSTATUS.BADREQUEST).json({
      errors: result
        .array()
        .map((error) => new ApiError(HTTPSTATUS.BADREQUEST, new Date().toISOString(), error.msg)),
    });
  }
  next();
};

module.exports = validateRequest;
