import { CustomError } from "./CustomError";


export class NotFoundError extends CustomError{
    statusCode = 404;
    constructor(){
        super("Route does not exist in server");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(){
        return [{message: "Route does not exist in server"}]
    }
}