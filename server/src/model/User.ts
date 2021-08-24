import{Schema, Model, Mongoose, model} from 'mongoose';
import{IUser} from '../interfaces/userInterfaces'
const schema = Schema;

const newUser = new schema<IUser>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
            type:String,
            required:true
    },
    
    username:{
        type:String,
        // required:true,
        unique:true
    },
    email:{
        type:String,
        // required:true,
        unique:true
    },
    password:{
        type:String,
        // required:true,
    },
    profile_pic:{
        type:String,
        default:''
    },
    token: String,
    account:String
})

// const User:Model<IUser> = Model('User',newUser)
export const User: Model<IUser> = model<IUser>('User',newUser)