"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForgotPassTokenMiddleware = void 0;
const constants_1 = require("../../constants");
const errors_1 = require("../../errors");
const user_1 = require("../../services/user");
const helpers_1 = require("../../helpers");
exports.checkForgotPassTokenMiddleware = async (req, res, next) => {
    const token = req.get(constants_1.RequestHeadersEnum.AUTHORIZATION);
    if (!token) {
        return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.BAD_REQUEST, errors_1.customErrors.BAD_REQUEST_NO_TOKEN.message));
    }
    await helpers_1.tokinVerificator(constants_1.ActionEnum.FORGOT_PASSWORD, token);
    const userByToken = await user_1.userService.findUserByActionToken(constants_1.ActionEnum.FORGOT_PASSWORD, token);
    if (!userByToken) {
        return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.NOT_FOUND, errors_1.customErrors.NOT_FOUND.message));
    }
    req.user = userByToken;
    next();
};
//# sourceMappingURL=check-forgote-pass-token.middleware.js.map