const  {Sequelize}=require("sequelize");



console.log(process.env,process.env.MYSQL_DATABASE,process.env.HOST,process.env.MYSQL_ROOT_PASSWORD,process.env.DB_USER)

const DATABASE_CONNECTION_CONFIG=new Sequelize(process.env.MYSQL_DATABASE,process.env.DB_USER,process.env.MYSQL_ROOT_PASSWORD,{
    host:process.env.HOST,
    port:process.env.PORT, 
    dialect:"mysql", 
});  
  
(async ()=>{
    try {
        await DATABASE_CONNECTION_CONFIG.authenticate(); 
        console.log("Database is authenticated");
        await DATABASE_CONNECTION_CONFIG.sync();
        console.log("Database is synced"); 
    } catch (error) {
        console.log("Unable to connect to database due to ",error); 
    }
})();

module.exports={DATABASE_CONNECTION_CONFIG} 