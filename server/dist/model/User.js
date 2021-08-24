"use strict";
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = require("mongoose");
var schema = mongoose_1.Schema;
var newUser = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        // required:true,
        unique: true
    },
    email: {
        type: String,
        // required:true,
        unique: true
    },
    password: {
        type: String
    },
    profile_pic: {
        type: String,
        "default": ''
    },
    token: String,
    account: String
});
// const User:Model<IUser> = Model('User',newUser)
exports.User = mongoose_1.model('User', newUser);
