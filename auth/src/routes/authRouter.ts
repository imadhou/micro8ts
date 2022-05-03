import express from 'express';
import { body } from 'express-validator';
import { AuthController } from  '../controllers/AuthController';
import {validateRequest} from '../helpers/validateRequest';
import { NotFoundError } from '../errors/NotFounError';
import { JoueurController } from '../controllers/JoueurController';
const router = express.Router();
const authController = new AuthController(); 
const joueurController = new JoueurController();

router.get('/currentuser',authController.currentUser);

router.post('/signup',[
        body('email').
            isEmail().
            withMessage("Invalid email"),
        body('password').
            trim().isLength({min:4, max:20}).
            withMessage('Min 4 chars and max 20 for passwod')
        ],
        validateRequest,
        authController.signup);

router.post('/joueur', joueurController.create)

router.post('/signin',[
    body('email').
        isEmail().
        withMessage("Invalid email"),
    body('password').
        trim().isLength({min:4, max:20}).
        withMessage('Min 4 chars and max 20 for passwod')
    ],
    validateRequest,
    authController.signIn);


router.get("*", (req, res, next)=>{
    return next(new NotFoundError());
});

export {router as authRouter};

