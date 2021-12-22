const ErrorResponse = require('../utils/errorResponse');

const erorrHandler = (err, req, res, next) =>{
console.log(err);
let error = { ...err};
error.message = err.message;

if(err.name ==="CastError"){
    const message = "Resource not found";
    error = new ErrorResponse(message, 404);
}

if(err.code === 11000){
    const message = "Duplicate field value or key error"
    error = new ErrorResponse(message, 400);
}

if(err.name==="ValidationError"){
    const message = object.values(err.errors).map(error => error.message).join(" , ");
    error = new ErrorResponse(message, 400);
}

req.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
})
};

module.exports = erorrHandler;