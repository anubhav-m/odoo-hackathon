export const errorMiddleware = (err, req, res, next) => {
    try{
        let error = { ...err };   //Copying err object into error
        error.message = err.message;  //Sometimes message is non-enumerable, so we explicitly set it
        error.statusCode = err.statusCode || 500; //Default status code is 500 (Internal Server Error)
        console.error(err);
        
        //Mongoose bad object id error
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key error
        if(err.code === 11000){
            const message = `Duplicate field value entered`;
            error = new Error(message);
            error.statusCode = 400
        }

        //Mongoose validation error
        if (err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(err.statusCode || 500 ).json({
            success: "false", 
            error: err.message || "Internal Server Error"
        });
    }

    catch(e){
        console.error(`Error in middleware : ${e}`);

        res.status(500).json({
            success: "false",
            error: "Internal Server Error"
        });
    }
}