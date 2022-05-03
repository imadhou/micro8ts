import { model, Schema } from "mongoose";
import { UserEntity } from "../DAL/Entities/UserEntity";
import bcrypt from 'bcrypt';

const schema = new Schema<UserEntity>({
    name: { type: String, required: true },
    email:  { type: String, required: true },
    password:  { type: String, required: true }
},
{
    toJSON:{
        transform(doc, ret){
            delete ret.password;
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id
        }
    }
});


schema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password!, 12);
    }
    next();
});

export const UserModelSchema = model<UserEntity>('users', schema);
