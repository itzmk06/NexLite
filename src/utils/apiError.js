const sendError=(res,statusCode,message,error)=>{
    res.status(statusCode).json({
        message,
        "error":error?.message
    });
};

module.exports={sendError};