const HTTPSTATUS = {
  OK: 200,
  CREATED: 201,
  NOCONTENT: 204,
  INTERNALSERVERERROR: 500,
  BADREQUEST: 400,
  UNAUTHORIZED: 401,
  NOTFOUND: 404,
  FORBIDDEN: 403,
};


const STATUS={
    SUCCESS:true,
    FAILED:false
}

const MESSAGE={
    SAVED:"Data saved successfully",
    NOTSAVED:"Data not saved",
    UPDATED:"Data updated successfully",
    NOTUPDATED:"Data not updated",
    DELETED:"Data deleted successfully",
    NOTDELETED:"Data not deleted",
    NOTFOUND:"User not found",
    FOUND:"User already exit",
    FETCHED:"Data feteched successfully",
    INVALID:"Invalid data",
    INVALIDCREDENTIALS:"Invalid credentials",
    INTERNALSERVERERROR:"Internal Server Error",
    UNAUTHORIZED:"Unauthorized request",
    INVALID_TOKEN:"Invalid access token",
    INVALID_EMAIL:"Invalid email",
    INVALID_PASSWORD:"Password must be 4 to 10 characters",
    EMAIL_REQUIRED:"Email field is required",
    PASSWORD_REQUIRED:"Password field is required",
    REQUIRED:"Data required",
    LOGGEDIN:"Successfully logged in"
}

module.exports={HTTPSTATUS,STATUS,MESSAGE};