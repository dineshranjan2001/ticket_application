const { DataTypes } = require("sequelize");
const {DATABASE_CONNECTION_CONFIG: sequelize}=require("../configs/auth-database-config");
const { hashPassword, hasPasswordChanged } = require("../utils/auth-crypto");


const User=sequelize.define('User',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    tableName:"users",
    timestamps:true
});

User.beforeCreate(async(user)=>{
    user.password=await hashPassword(user.password);
});


User.beforeUpdate(async(user)=>{
    if(hasPasswordChanged(user.password,user.previous("password"))){
        user.password=await hashPassword(user.password);
    }
})

module.exports={User};