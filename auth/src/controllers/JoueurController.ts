import { NextFunction, Response, Request } from "express";
import { JoueurRepository } from "../DAL/Repository/JoueurRepository";
import { JoueurEntity } from "../DAL/Entities/JoueurEntity";

export class JoueurController{
    private joueurRepo = new JoueurRepository();

    public create = async(req: Request , res: Response, next: NextFunction)=>{ 
    
        const joueurInput = req.body as JoueurEntity;
        const joueur = await this.joueurRepo.create(joueurInput);
        
        res.status(200).json({
            status: 'success',
            data: joueur,
        });
    }
}