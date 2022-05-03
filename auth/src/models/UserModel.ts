import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IBaseUser } from '../interfaces/IBaseUser';

//Used as type of params for static build function


//Annotation for  User document
//This is the type that we will got when creatin or finding documents
interface UserDoc extends mongoose.Document, IBaseUser{
    createdAt: Date;
    updatedAt: Date;
    correctPassword(inputPassword: string, password: string):Promise<boolean>;
};

//Type assertion (like casting) to UserDoc
interface UserModel extends mongoose.Model<UserDoc>{
    build(attr: IBaseUser): UserDoc;
}

//Type assertion (like casting) to UserDoc
const userSchema = new mongoose.Schema<UserDoc>({
    email:{
        type: String,
        required: true,
        unique: [true, "Email is already in use, please provide another email!"]
    },
    password:{
        type: String,
        required: true
    },
    name: String,
    surname: String,
    pseudo: String,
    address: String,
    phone: Number,
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
}
);

userSchema.static('build', function build(attr: IBaseUser){
    return new User(attr);
});

userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password!, 12);
    }
    next();
});

userSchema.methods.correctPassword = async function(passwordInput: string, password: string): Promise<boolean>{
    return await bcrypt.compare(passwordInput, password)
}


const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };