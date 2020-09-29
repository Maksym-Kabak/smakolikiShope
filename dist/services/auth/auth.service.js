"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const dataBase_1 = require("../../dataBase");
class AuthService {
    createTokenPair(tokenObject) {
        const tokenToCreate = new dataBase_1.AccessTokenModel(tokenObject);
        return tokenToCreate.save();
    }
    async findUserByToken(findObject) {
        var _a;
        const tokenAndUser = await dataBase_1.AccessTokenModel
            .findOne(findObject)
            .populate('userId')
            .select({ userId: 1, _id: 0 });
        return (_a = tokenAndUser === null || tokenAndUser === void 0 ? void 0 : tokenAndUser.userId) === null || _a === void 0 ? void 0 : _a.toJSON();
    }
    removeToken(removeObject) {
        return dataBase_1.AccessTokenModel.findOneAndDelete(removeObject).exec();
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map