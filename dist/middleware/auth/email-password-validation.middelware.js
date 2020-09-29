"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailPasswordValidatorMiddleware = void 0;
const vallidators_1 = require("../../vallidators");
const errors_1 = require("../../errors");
const constants_1 = require("../../constants");
exports.emailPasswordValidatorMiddleware = (req, res, next) => {
    const { error } = vallidators_1.emailPasswordValidator.validate(req.body);
    if (error) {
        return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }
    next();
};
//# sourceMappingURL=email-password-validation.middelware.js.map