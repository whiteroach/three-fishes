"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var mongoose_1 = require("mongoose");
var user_1 = __importDefault(require("./routes/user"));
var apiErrorHandler_1 = require("./error/apiErrorHandler");
require("dotenv/config");
var app = express_1["default"]();
var PORT = 8080;
var cors = require('cors');
//settings
app.use(express_1["default"].static(__dirname + '/public'));
app.use(express_1["default"].json());
app.use(cors());
//Routes 
app.use('/', user_1["default"]);
app.use(apiErrorHandler_1.apiErrorHandler);
// app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
//     console.log(error)
//     const status =  500
//     const message = error.message;
//     res.status(status).json(message)
// })
//DATABASE
var DB_NAME = process.env.DB_NAME;
// const uri:string | undefined =  (process.env.DB_LINK as string)
var uri = process.env.DB_LINK + DB_NAME;
mongoose_1.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(function () { console.log('Mongoose found his way to the database...'); })["catch"](function (err) { console.log(err); });
app.listen(PORT, function () {
    console.log(PORT, "Listen on PORT " + PORT);
});
// app.get('/', (_req:Request, res:Response):void => {
//     // res.send('Hello World!');
//     res.send(DB_LINK)
//   });
