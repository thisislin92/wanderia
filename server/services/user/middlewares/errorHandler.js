const errorHandlers = (error, req, res, next) => {
    console.log(error);
    // by default all error response from backend will have error code 500, unless it is replaced by the error messages listed below
    let code = 500;
    let msg = error.message;
    switch (error.name) {
        // error from libraries (jsonwebtoken, sequelize)
        case "JsonWebTokenError":
            code = 401;
            msg = "Invalid token";
            break;
        case "MissingOrInvalidJWT":
            (code = 401), (msg = "Invalid token");
            break;
        case "InvalidCredentials":
            code = 401;
            msg = "Invalid email/password";
            break;
        case "Unauthenticated":
            code = 401;
            msg = "Unauthenticated";
            break;
        case "NotFound":
            code = 404;
            msg = "Not found";
            break;
        case "MongoServerError": {
            if (
                error.message.includes("E11000 duplicate key error collection")
            ) {
                code = 409;
            }
        }
        default:
            break;
    }

    const errorResponse = {
        code,
        // ...error // this is for debugging
    };

    errorResponse.message = msg;

    res.status(code).json(errorResponse);
};

module.exports = errorHandlers;
