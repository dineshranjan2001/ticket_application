const  {Sequelize}=require("sequelize");
const database_config=require("../test/mysql_config.json");



// console.log(process.env,process.env.MYSQL_DATABASE,process.env.HOST,process.env.MYSQL_ROOT_PASSWORD,process.env.DB_USER)

const DATABASE_CONNECTION_CONFIG=new Sequelize(process.env.MYSQL_DATABASE,process.env.DB_USER,process.env.MYSQL_ROOT_PASSWORD,{
    host:process.env.HOST,
    port:process.env.PORT, 
    dialect:"mysql", 
});  
// const DATABASE_CONNECTION_CONFIG=new Sequelize(database_config.database,database_config.username,database_config.password,{
//     host:database_config.host,
//     port:database_config.port, 
//     dialect:database_config.dialect,
//     logging:false,
// });  
  
(async ()=>{
    try {
        await DATABASE_CONNECTION_CONFIG.authenticate(); 
        console.log("Database is authenticated");
        await DATABASE_CONNECTION_CONFIG.sync();
        console.log("Database is synced"); 
    } catch (error) {
        console.log("Unable to connect to database due to ",error); 
        throw error;
    }
})();

module.exports={DATABASE_CONNECTION_CONFIG} 