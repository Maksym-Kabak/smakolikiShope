"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller");
const user_1 = require("../../middleware/user");
const router = express_1.Router();
router.post('/', user_1.checkIsEmailExistsMiddleware, controller_1.productController.createProduct);
exports.productRouter = router;
//# sourceMappingURL=product.router.js.map