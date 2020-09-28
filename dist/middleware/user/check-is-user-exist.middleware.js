"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsUserExistsMiddleware = void 0;
const user_1 = require("../../services/user");
const errors_1 = require("../../errors");
const constants_1 = require("../../constants");
exports.checkIsUserExistsMiddleware = async (req, res, next) => {
    const { email } = req.body;
    const userByEmail = await user_1.userService.findOneByParams({ email });
    if (!userByEmail) {
        return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.NOT_FOUND, errors_1.customErrors.NOT_FOUND.message));
    }
    req.user = userByEmail;
    next();
};
//# sourceMappingURL=check-is-user-exist.middleware.js.map