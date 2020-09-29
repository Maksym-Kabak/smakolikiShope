"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const dataBase_1 = require("../../dataBase");
class ProductService {
    createdProduct(product) {
        const productToSave = new dataBase_1.ProductModel(product);
        return productToSave.save();
    }
}
exports.productService = new ProductService();
//# sourceMappingURL=product.service.js.map