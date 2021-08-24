"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.userController = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var User_1 = require("../model/User");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ApiError_1 = require("../error/ApiError");
// REGISTRATION
var signUp = function (req, res, next) {
    var body = req.body;
    var firstName = body.firstName, lastName = body.lastName, username = body.username, email = body.email, password = body.password;
    // console.log(req.body,'body registration')
    var error = {};
    if (firstName == '' || lastName == '' || username == '' || email == '' || password == '') {
        next(ApiError_1.ApiError.unauthorized('no data'));
        // return res.json(error)
        return;
    }
    User_1.User.findOne({ username: req.body.username }, function (err, data) {
        if (err)
            throw err;
        if (data !== null) {
            res.json({ msg: 'Username already exist' });
        }
        else {
            User_1.User.findOne({ email: req.body.email }, function (err, data) {
                if (data !== null) {
                    res.json({ msg: 'Email already registered' });
                }
                else {
                    var userPassword_1 = req.body.password;
                    var saltRounds = 10;
                    bcrypt_1["default"].genSalt(saltRounds, function (err, salt) {
                        bcrypt_1["default"].hash(userPassword_1, salt, function (err, hashPassword) {
                            req.body.password = hashPassword;
                            var newUser = new User_1.User(req.body);
                            newUser.save(function (err, doc) {
                                if (err)
                                    throw err;
                                res.status(201).json({ msg: doc.username + " successfully added." });
                            });
                        });
                    });
                }
            });
        }
    });
};
// LOGIN
var login = function (req, res, next) {
    var body = req.body;
    var username = body.username, password = body.password;
    var error = {};
    if (!req.body) {
        next(ApiError_1.ApiError.badRequest('request has no body'));
    }
    if (username == '') {
        error.username = 'Username is required';
    }
    if (password == '') {
        error.password = 'Password is required';
    }
    if (username == '' || password == '') {
        res.json({ msg: error });
    }
    User_1.User.findOne({ username: req.body.username }, function (err, data) {
        // console.log(data)
        if (data == null) {
            res.json({ msg: 'Username not found' });
        }
        else {
            bcrypt_1["default"].compare(req.body.password, data.password, function (err, result) {
                if (err)
                    throw err;
                if (result) {
                    var secret = process.env.TOKEN_SECRET;
                    var token_1 = jsonwebtoken_1["default"].sign({ id: data._id }, secret, { expiresIn: '1h' });
                    User_1.User.findOneAndUpdate({ username: req.body.username }, { token: token_1 }, {
                        returnOriginal: false
                    }, function (err, doc) {
                        res.json({ token: token_1, username: req.body.username });
                    });
                }
                else {
                    res.json({ msg: 'incorrect password' });
                }
            });
        }
    });
};
var logout = function (req, res, next) {
    if (!req.body) {
        next(ApiError_1.ApiError.badRequest('username required'));
    }
    else {
        User_1.User.findOneAndUpdate({ username: req.body.username }, { token: '' }, {
            returnOriginal: false
        }, function (err, doc) {
            if (err) {
                console.error('could not logout', err);
                return;
            }
            res.status(200).json('you logged out');
        });
    }
};
var profile = function (req, res) {
    var token = req.body.token;
    var secret = process.env.TOKEN_SECRET;
    // jwt.verify(token, secret,(err, decoded)=>{
    //     if(err) throw err;
    //     const decodedId:string |undefined = decoded.id!
    //     User.findById(decodedId, (err,user)=>{
    //         if(err) throw err;
    //         console.log(user,'user profile')
    //         res.json(user)
    //     })
    // })
};
exports.userController = {
    signUp: signUp,
    login: login,
    logout: logout,
    profile: profile
};
