"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller");
const middleware_1 = require("../../middleware");
const router = express_1.Router();
router.post('/', middleware_1.emailPasswordValidatorMiddleware, middleware_1.checkIsUserExistsByEmailMiddleware, middleware_1.checkIsUserConfirmedMiddleware, controller_1.authController.authUser);
router.post('/logout', middleware_1.checkAccessTokenMiddleware, controller_1.authController.logoutUser);
exports.authRouter = router;
//# sourceMappingURL=auth.router.js.map