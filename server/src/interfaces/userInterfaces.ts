import{Document} from 'mongoose';
export interface ISignUpError {
    firstName?:string,
    lastName?:string,
    username?:string,
    email?:string,
    password?:string,
}
export interface IMsg {
    msg:string|object
}

export interface IUser extends Document {
    firstName: string,
    lastName: string,
    username:string,
    email:string,
    password:string,
    profile_pic:string,
    token?:string,
    account:string
}