"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller");
const middleware_1 = require("../../middleware");
const router = express_1.Router();
router.post('/', middleware_1.checkAccessTokenMiddleware, controller_1.productController.createProduct);
exports.productRouter = router;
//# sourceMappingURL=product.router.js.map