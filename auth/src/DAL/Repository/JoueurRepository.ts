import { JoueurModelSchema } from "../../models/JoueurModelSchema";
import { JoueurEntity } from "../Entities/JoueurEntity";

export class JoueurRepository{
    constructor(){}

    async create(joueur: JoueurEntity): Promise<JoueurEntity | null>{
        return await JoueurModelSchema.create(joueur);
    }
}