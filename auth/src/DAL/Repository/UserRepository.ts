import { UserModelSchema } from "../../models/UserModelSchema";
import { UserEntity } from "../Entities/UserEntity";
import bcrypt from 'bcrypt';

export class UserRepository{
    constructor(){}

    async createUser(user: UserEntity): Promise<UserEntity>{
        return await UserModelSchema.create(user);
    }

    async getUserByEmail(email: string): Promise<UserEntity | null>{
        return await UserModelSchema.findOne({email: email});
    }

    async getUserById(id: string): Promise<UserEntity | null>{
        return await UserModelSchema.findById(id);
    }

    async correctPassword (passwordInput: string, password: string): Promise<boolean>{
        return await bcrypt.compare(passwordInput, password)
    }
}