"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokinVerificator = void 0;
const jwt = require("jsonwebtoken");
const util_1 = require("util");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const config_1 = require("../config");
const verify = util_1.promisify(jwt.verify);
exports.tokinVerificator = async (action, token) => {
    let isValid = false;
    switch (action) {
        case constants_1.ActionEnum.USER_REGISTER:
            isValid = await verify(token, config_1.config.JWT_CONFIRM_EMAIL_SECRET);
            break;
        case constants_1.ActionEnum.FORGOT_PASSWORD:
            isValid = await verify(token, config_1.config.JWT_PASS_RESET_SECRET);
            break;
        default:
            throw new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.SERVER, 'wrong Action type');
    }
    return isValid;
};
//# sourceMappingURL=token-verificator.helper.js.map