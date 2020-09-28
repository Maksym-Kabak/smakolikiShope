"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
exports.hashPassword = (password) => bcrypt.hash(password, 10);
exports.comparePassword = (password, hash) => bcrypt.compare(password, hash);
//# sourceMappingURL=password-hasher.helper.js.map