import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError{
    statusCode: number;
    
    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: this.message}]
    }
}