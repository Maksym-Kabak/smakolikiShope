"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const services_1 = require("../../services");
class ProductController {
    async createProduct(req, res, next) {
        const { _id } = req.user;
        const product = req.body;
        const newProduct = await services_1.productService.createdProduct({ ...product, userId: _id });
        res.json(newProduct);
    }
}
exports.productController = new ProductController();
//# sourceMappingURL=product.controller.js.map