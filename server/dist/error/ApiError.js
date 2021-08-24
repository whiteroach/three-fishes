"use strict";
exports.__esModule = true;
exports.ApiError = void 0;
var ApiError = /** @class */ (function () {
    function ApiError(code, message) {
        this.code = code,
            this.message = message;
    }
    ApiError.badRequest = function (msg) {
        return new ApiError(400, msg);
    };
    ApiError.unauthorized = function (msg) {
        return new ApiError(401, msg);
    };
    ApiError.notFound = function (msg) {
        return new ApiError(404, msg);
    };
    ApiError.serverError = function (msg) {
        return new ApiError(500, msg);
    };
    return ApiError;
}());
exports.ApiError = ApiError;
// module.exports = ApiError
