import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { ISignUpError, IUser } from '../interfaces/userInterfaces'
import { User } from '../model/User'
import jwt from 'jsonwebtoken'
import {ApiError} from '../error/ApiError';

type bodyLogin = { username:string,password:string }
type bodySignUp = {firstName:string, lastName: string, username:string, email:string, password:string}
// REGISTRATION
const signUp = (req:Request, res:Response, next:NextFunction) => {
    const body:bodySignUp=req.body
    const{firstName, lastName, username, email, password} = body;
    // console.log(req.body,'body registration')
    const error:ISignUpError = {};
    
    if(firstName == '' || lastName == '' || username == '' || email == '' || password == ''){
        next(ApiError.unauthorized('no data'))
        // return res.json(error)
        return
    }
    User.findOne({username:req.body.username},(err:object,data:object|null)=>{
        if(err)throw err
        if(data !== null){
            res.json({msg:'Username already exist'})
        }else {
            User.findOne({email:req.body.email}, (err:object, data:object|null)=> {
                if(data !== null){
                    res.json({msg:'Email already registered'})
                } else {
                    const userPassword:string = req.body.password;
                    const saltRounds:number = 10;
                    bcrypt.genSalt(saltRounds,(err,salt)=>{bcrypt.hash(userPassword, salt, (err, hashPassword)=>{
                        req.body.password = hashPassword;
                        const newUser:IUser = new User(req.body);
                        newUser.save((err, doc)=>{
                            if(err) throw err;
                            res.status(201).json({msg:`${doc.username} successfully added.`})
                        })
                    })})
                }
            })
        }
    })
}

// LOGIN
const login = (req:Request, res:Response, next:NextFunction) => {
    const body:bodyLogin=req.body
    const{username, password} = body;
    const error:ISignUpError = {};
    if(!req.body){
        next(ApiError.badRequest('request has no body'))
    }
    if(username == ''){
        error.username ='Username is required';
    }
    if(password == ''){
        error.password = 'Password is required'
    }
    if(username == '' || password == ''){
        res.json({msg:error})
    }
    User.findOne({username:req.body.username},(err:object,data:null|IUser)=>{
        // console.log(data)
        if(data == null){
            res.json({msg:'Username not found'})
        } else {
            
            bcrypt.compare(req.body.password, data.password, (err, result) => {
                if (err) throw err;
                if(result){
                    const secret:string = process.env.TOKEN_SECRET!;
                    const token:string = jwt.sign({id:data._id},secret, {expiresIn:'1h'})
            
                    User.findOneAndUpdate({username:req.body.username},{token:token},{
                        returnOriginal: false
                      },(err,doc) => {
                        res.json({token,username:req.body.username})
                      })
                }else{res.json({msg:'incorrect password'})}
            })
        }
    })
}

const logout = (req:Request,res:Response,next:NextFunction):void => {
    if(!req.body){
        next(ApiError.badRequest('username required'))
    }else{
        User.findOneAndUpdate({username:req.body.username},{token:''},{
            returnOriginal: false
        },(err,doc) => {
            if(err){
                console.error('could not logout', err)
                return;
            }
            res.status(200).json('you logged out') 
        })
    }
    
}

const profile = (req:Request,res:Response):void => {
    const token:string = req.body.token
    const secret:string = process.env.TOKEN_SECRET!
    // jwt.verify(token, secret,(err, decoded)=>{
    //     if(err) throw err;
    //     const decodedId:string |undefined = decoded.id!
    //     User.findById(decodedId, (err,user)=>{
    //         if(err) throw err;
    //         console.log(user,'user profile')
    //         res.json(user)
    //     })
    // })
}

export const userController = {
    signUp:signUp,
    login:login,
    logout:logout,
    profile:profile
}