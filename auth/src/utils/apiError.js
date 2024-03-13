class ApiError extends Error{
    constructor(statusCode,timestamp,message="Something went wrong"){
        super(message);
        console.log(message);
        this.statusCode=statusCode;
        this.timestamp=timestamp || new Date().toISOString();
    }

    toJSON() {
        return {
          statusCode: this.statusCode,
          message: this.message, 
          timestamp: this.timestamp
        };
      }
}

module.exports=ApiError;