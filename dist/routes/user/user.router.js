"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller");
const middleware_1 = require("../../middleware");
const router = express_1.Router();
router.post('/', middleware_1.checkIsUserValidMiddleware, middleware_1.checkIsEmailExistsMiddleware, controller_1.userController.createUser);
router.post('/confirm', middleware_1.checkConfirmTokenMiddleware, controller_1.userController.confirmUser);
router.post('/password/forgot', middleware_1.emailValidatorMiddleware, middleware_1.checkIsUserExistsByEmailMiddleware, controller_1.userController.forgotPassword);
router.post('/password/reset', middleware_1.singlePasswordValidatorMiddleware, middleware_1.checkForgotPassTokenMiddleware, controller_1.userController.setForgotPass);
exports.userRouter = router;
//# sourceMappingURL=user.router.js.map