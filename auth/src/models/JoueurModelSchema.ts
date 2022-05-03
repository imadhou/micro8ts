import { model, Schema } from "mongoose";
import { JoueurEntity } from "../DAL/Entities/JoueurEntity";
import { UserModelSchema } from "./UserModelSchema";
import { UserEntity } from "../DAL/Entities/UserEntity";

const schema = new Schema<JoueurEntity>({
    post: String,
    goals: Number,
    assists: Number,
    user: Document<>
});

schema.pre('save', async function(next){
    const user = await UserModelSchema.findById(this.user!.id);
    this.user = user!;
    next();
});

export const JoueurModelSchema = model<JoueurEntity>('joueurs', schema);