import express,{Application,Request, Response, NextFunction} from 'express';
import {connect} from 'mongoose';
import userRoute from './routes/user'
import {apiErrorHandler} from './error/apiErrorHandler'
import 'dotenv/config'
const app: Application = express();
const PORT:number = 8080;
const cors = require('cors')


//settings
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(cors())


//Routes 
app.use('/', userRoute) 
app.use(apiErrorHandler)
// app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
//     console.log(error)
//     const status =  500
//     const message = error.message;
//     res.status(status).json(message)
// })
//DATABASE
const DB_NAME:string = process.env.DB_NAME!;
// const uri:string | undefined =  (process.env.DB_LINK as string)
const uri:string =  process.env.DB_LINK+ DB_NAME!
connect(uri,{ useUnifiedTopology: true, useNewUrlParser:true })
.then(()=>{console.log('Mongoose found his way to the database...')})
.catch((err:object):void=>{console.log(err)})
app.listen(PORT, ():void => {
    console.log(PORT,`Listen on PORT ${PORT}`)
})

// app.get('/', (_req:Request, res:Response):void => {
//     // res.send('Hello World!');
//     res.send(DB_LINK)
//   });
