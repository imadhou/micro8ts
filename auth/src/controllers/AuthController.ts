import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken';
import { BadRequestError } from "../errors/BadRequestError";
import { UserEntity } from "../DAL/Entities/UserEntity";
import { UserRepository } from "../DAL/Repository/UserRepository";

export class AuthController{
    private userRepo = new UserRepository();

    public constructor(){
    }


    private signToken(payload: UserEntity): string{
        var token: string;
            token = jwt.sign(
                {"id": payload.id,
                 "email": payload.email},
                process.env.JWT_SECRET!, 
                {
                    expiresIn: process.env.JWT_EXPIRES
                }
            );
        return token;
    };
    
    
    private verifyToken(token: string): UserEntity{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserEntity;
        return decoded;
    }

    public signup = async(req: Request , res: Response, next: NextFunction)=>{ 
    
        const userInput = req.body as UserEntity;
        const user = await this.userRepo.createUser(userInput);
        
        const token = this.signToken(user);
        res.status(200).json({
            status: 'success',
            data: token,
            user: user
        });
    }

    public signIn = async(req: Request, res: Response, next: NextFunction)=>{

        const userInput = req.body as UserEntity;
    
        const user = await this.userRepo.getUserByEmail(userInput.email);
        if(! user){
            return next(new BadRequestError("Invalid credentials", 401));
        }
    
        if(!await this.userRepo.correctPassword(userInput.password!, user.password!)){
            return next(new BadRequestError("invalid credentials", 401));
        }
    
        const jwtToken = this.signToken(user);
    
        
        res.status(200).json({
            status: 'success',
            data: jwtToken,
        });
    
    
        next();
    }
    
    // const signOut = async (req: Request, res: Response, next: NextFunction)=>{
    //     if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')){   
    //         return next(new BadRequestError("You are not logged in, please login", 401));
    //     }
    
    //     const token = req.headers.authorization.split(' ')[1];
    //     if(!token){
    //         return next(new UnauthorizedError());
    //     }
    
    //     const payload = verifyToken(token, next);
    //     res.status(200).json({});
        
    // }
    
    public currentUser = async(req: Request, res: Response, next: NextFunction)=>{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')){   
            return next(new BadRequestError("Access denied, please login", 401));
        }
    
        const token = req.headers.authorization.split(' ')[1];
        const payload = this.verifyToken(token);
        const user = await this.userRepo.getUserById(payload.id!);
        res.status(200).json({
            status: 'success',
            data: user
        });
    }
    
}


