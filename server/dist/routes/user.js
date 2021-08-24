"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userController_1 = require("../controller/userController");
var router = express_1.Router();
//SIGN-UP
router.post('/signUp', userController_1.userController.signUp);
//LOGIN
router.post('/login', userController_1.userController.login);
//LOG OUT
router.put('/logout', userController_1.userController.logout);
exports["default"] = router;
