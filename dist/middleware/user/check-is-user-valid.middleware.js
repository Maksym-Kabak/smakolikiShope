"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsUserValidMiddleware = void 0;
const user_1 = require("../../vallidators/user");
exports.checkIsUserValidMiddleware = (req, res, next) => {
    const { error } = user_1.newUserValidator.validate(req.body);
    if (error) {
        return next(new Error(error.details[0].message));
    }
    next();
};
//# sourceMappingURL=check-is-user-valid.middleware.js.map