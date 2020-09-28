"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const constants_1 = require("../../constants");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const errors_1 = require("../../errors");
class UserController {
    async createUser(req, res, next) {
        const user = req.body;
        user.password = await helpers_1.hashPassword(user.password);
        // await comparePassword('xx', 'xx');
        const { _id } = await services_1.userService.createUser(user);
        const { access_token } = helpers_1.tokinizer(constants_1.ActionEnum.USER_REGISTER);
        await services_1.userService.addActionToken(_id, { action: constants_1.ActionEnum.USER_REGISTER, token: access_token });
        await services_1.emailService.sendEmail(user.email, constants_1.ActionEnum.USER_REGISTER, { token: access_token });
        await services_1.logService.createLog({ event: constants_1.LogEnum.USER_REGISTERED, userId: _id });
        res.sendStatus(constants_1.ResponseStatusCodesEnum.CREATED);
    }
    async confirmUser(req, res, next) {
        const { _id, status, tokens = [] } = req.user;
        const tokenToDelete = req.get(constants_1.RequestHeadersEnum.AUTHORIZATION);
        if (status !== constants_1.UserStatusEnum.PENDING) {
            return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.BAD_REQUEST, errors_1.customErrors.BAD_REQUEST_USER_ACTIVATED.message, errors_1.customErrors.BAD_REQUEST_USER_ACTIVATED.code));
        }
        await services_1.userService.updateUserByParams({ _id }, { status: constants_1.UserStatusEnum.CONFIRMED });
        const index = tokens === null || tokens === void 0 ? void 0 : tokens.findIndex(({ action, token }) => {
            return token === tokenToDelete && action === constants_1.ActionEnum.USER_REGISTER;
        });
        if (index !== -1) {
            tokens === null || tokens === void 0 ? void 0 : tokens.splice(index, 1);
            await services_1.userService.updateUserByParams({ _id }, { tokens });
        }
        await services_1.logService.createLog({ event: constants_1.LogEnum.USER_CONFIRMED, userId: _id });
        res.end();
    }
    async forgotPassword(req, res, next) {
        const { _id, email } = req.user;
        const { access_token } = helpers_1.tokinizer(constants_1.ActionEnum.FORGOT_PASSWORD);
        await services_1.userService.addActionToken(_id, { token: access_token, action: constants_1.ActionEnum.FORGOT_PASSWORD });
        await services_1.emailService.sendEmail(email, constants_1.ActionEnum.FORGOT_PASSWORD, { token: access_token });
        res.end();
    }
    async setForgotPass(req, res, next) {
        const { _id, tokens = [] } = req.user;
        const { password } = req.body;
        const tokenToDelete = req.get(constants_1.RequestHeadersEnum.AUTHORIZATION);
        const hashPass = await helpers_1.hashPassword(password);
        await services_1.userService.updateUserByParams({ _id }, { password: hashPass });
        const index = tokens.findIndex(({ action, token }) => {
            return token === tokenToDelete && action === constants_1.ActionEnum.FORGOT_PASSWORD;
        });
        if (index !== -1) {
            tokens.splice(index, 1);
            await services_1.userService.updateUserByParams({ _id }, { tokens });
        }
        res.end();
    }
}
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map