"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
exports.ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(constants_1.ProductTypeEnum)
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    hasDiscount: {
        type: Boolean,
        required: false,
        default: false
    },
    oldPrice: {
        type: Number,
        required: false
    },
    tags: {
        type: Array,
        required: false
    },
    photos: {
        type: Array,
        required: false
    },
    docs: {
        type: Array,
        required: false
    },
    stockCount: {
        type: Number,
        required: true,
        default: 0
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: constants_1.TableNamesEnum.USER
    }
}, {
    timestamps: true
});
exports.ProductModel = mongoose_1.model(constants_1.TableNamesEnum.PRODUCTS, exports.ProductSchema);
//# sourceMappingURL=product.schema.js.map