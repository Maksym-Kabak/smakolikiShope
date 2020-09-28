"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongoose_1 = require("mongoose");
const dataBase_1 = require("../../dataBase");
class UserService {
    createUser(user) {
        const userToCreate = new dataBase_1.UserModel(user);
        return userToCreate.save();
    }
    addActionToken(userId, tokenObject) {
        return dataBase_1.UserModel.update({ _id: mongoose_1.Types.ObjectId(userId) }, {
            $push: {
                tokens: tokenObject
            }
        });
    }
    updateUserByParams(params, update) {
        return dataBase_1.UserModel.updateOne(params, update, { new: true });
    }
    findOneByParams(findObject) {
        return dataBase_1.UserModel.findOne(findObject);
    }
    findUserByActionToken(action, token) {
        return dataBase_1.UserModel.findOne({
            $and: [
                { 'tokens.action': action },
                { 'tokens.token': token }
            ]
        });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map