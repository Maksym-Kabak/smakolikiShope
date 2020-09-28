"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlTemplates = void 0;
const constants_1 = require("../constants");
exports.htmlTemplates = {
    [constants_1.ActionEnum.USER_REGISTER]: {
        subject: 'Вітаємо',
        templateFileName: 'user-welcome'
    },
    [constants_1.ActionEnum.FORGOT_PASSWORD]: {
        subject: 'Співчуваєм',
        templateFileName: 'forgot-password'
    }
};
//# sourceMappingURL=index.js.map