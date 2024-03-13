const { User } = require("../models/user-model")

const findUserByEmail=async (email)=>{
    const exitedUser=await User.findOne({
        where:{
            email:email,
        }
    });
    return exitedUser;
}

const saveUser=async (email,password)=>{
    const savedUser=await User.create({
        email,
        password
    });
    return savedUser;
}
module.exports={findUserByEmail,saveUser}