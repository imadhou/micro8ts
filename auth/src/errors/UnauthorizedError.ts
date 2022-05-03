import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError{
    
    public statusCode: number = 401;
    private errorMessage: string = "Access denied for user";


    constructor(){
        super();
        Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }

    
    serializeErrors(){
        return [{message: this.errorMessage}];
    }
}





