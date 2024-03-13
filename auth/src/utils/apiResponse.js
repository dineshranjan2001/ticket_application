class ApiResponse{
    constructor(success,statusCode,message,data,timestamp){
        this.success=success;
        this.statusCode=statusCode;
        this.message=message;
        this.data=data;
        this.timestamp=timestamp;
    }
}

module.exports={ApiResponse};