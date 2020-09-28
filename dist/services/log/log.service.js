"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logService = void 0;
const dataBase_1 = require("../../dataBase");
class LogService {
    createLog(log) {
        const logToCreate = new dataBase_1.LogModel(log);
        return logToCreate.save();
    }
}
exports.logService = new LogService();
//# sourceMappingURL=log.service.js.map