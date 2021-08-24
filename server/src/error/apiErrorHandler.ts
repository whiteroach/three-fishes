import express,{Request, Response, NextFunction} from 'express';
import {ApiError} from './ApiError'

export const apiErrorHandler = (err:object | ApiError,req:Request,res:Response,next:NextFunction) => {
    if(err instanceof ApiError){
        res.status(err.code).json({msg:err.message})
        return
    }
    res.status(500).json({msg:'something went horribly wrong'})
}

// module.exports = apiErrorHandler
