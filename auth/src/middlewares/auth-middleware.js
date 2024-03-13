const jwt=require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const { HTTPSTATUS, MESSAGE } = require("../utils/constants");

const verifyToken=asyncHandler(async(req,_,next)=>{

    try {
        if(!req.session?.token){
            throw new JSON.parse({"errors":new ApiError(HTTPSTATUS.UNAUTHORIZED,new Date().toISOString(),MESSAGE.INVALID_TOKEN)});
        }
    
        const decodedToken=jwt.verify(req.session?.token,process.env.ACCESS_TOKEN_SECRET);
        const user={
            id:decodedToken.id,
            email:decodedToken.email
        };
        if(!user){
            throw new JSON.parse({"errors":new ApiError(HTTPSTATUS.UNAUTHORIZED,new Date().toISOString(),MESSAGE.UNAUTHORIZED)});
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        throw new JSON.parse({"errors":new ApiError(HTTPSTATUS.UNAUTHORIZED,new Date().toISOString(),MESSAGE.INVALID_TOKEN)})
    }
});

module.exports=verifyToken;