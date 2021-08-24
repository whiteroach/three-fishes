"use strict";
exports.__esModule = true;
exports.apiErrorHandler = void 0;
var ApiError_1 = require("./ApiError");
var apiErrorHandler = function (err, req, res, next) {
    if (err instanceof ApiError_1.ApiError) {
        res.status(err.code).json({ msg: err.message });
        return;
    }
    res.status(500).json({ msg: 'something went horribly wrong' });
};
exports.apiErrorHandler = apiErrorHandler;
// module.exports = apiErrorHandler
