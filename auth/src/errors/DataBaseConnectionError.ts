import { CustomError } from "./CustomError";

export class DataBaseConnectionError extends CustomError{
    reason = "Error in db conn";
    statusCode = 500;
    constructor(){
        super('Error connecting to db');
        Object.setPrototypeOf(this,DataBaseConnectionError.prototype);
    }

    serializeErrors(){
        return [
            {message: this.reason}
        ]
    }
}
