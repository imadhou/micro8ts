import mongoose from 'mongoose';
import { app } from './app';


const startApp = async ()=>{

    console.log(process.env.NODE_ENV)
    if(!process.env.JWT_SECRET){
        throw new Error("Env var not defined");
    }

    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(()=>console.log("connected to db")).catch(err=>console.log(err));
    app.listen(3000, () => {
        console.log("listening on port 3000");
    });
};

startApp();