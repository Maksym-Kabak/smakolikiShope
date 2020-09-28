"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidatorMiddleware = void 0;
const user_1 = require("../../vallidators/user");
const errors_1 = require("../../errors");
const constants_1 = require("../../constants");
exports.emailValidatorMiddleware = (req, res, next) => {
    const { error } = user_1.emailValidator.validate(req.body);
    if (error) {
        return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }
    next();
};
//# sourceMappingURL=email-validator.middleware.js.map