import express from "express";
import { CustomError } from "../errors/CustomError";
import { MongoError } from "mongodb";
export const sendError = (err: Error, req: express.Request, res:express.Response, next: express.NextFunction)=>{


    if(err instanceof MongoError){
        if(err.code === 11000){
            const errorString = JSON.stringify(err);
            const errorObject = JSON.parse(errorString);
            const field = Object.keys(errorObject.keyValue)[0];
            const value = errorObject.keyValue[field];
            const message = `"${field}": "${value}"  already in use, Please enter another value!`;

            console.log(message);
            return res.status(400).json({errors: [
                {message}
            ]});
        }
    }
 
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({errors: err.serializeErrors()});
    }

    console.log(err);

    return res.status(500).json({errors: [
        {message: "Something went wrong"}
    ]});
}
    
  

