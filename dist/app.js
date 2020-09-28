"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const halmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const config_1 = require("./config");
const user_1 = require("./routes/user");
const constants_1 = require("./constants");
dotenv.config();
const serverRequestLimit = rateLimit({
    windowMs: config_1.config.serverRateLimits.period,
    max: config_1.config.serverRateLimits.maxRequests
});
class App {
    constructor() {
        this.app = express();
        this.configureCors = (origin, cb) => {
            const whiteList = config_1.config.ALLOWED_ORIGIN.split(';');
            if (!origin) {
                return cb(null, true);
            }
            if (whiteList.includes(origin)) {
                return cb(new Error('Cors not allowed'), false);
            }
            return cb(null, true);
        };
        global.appRoot = path.resolve(process.cwd(), '../');
        this.app.use(morgan('dev'));
        this.app.use(halmet());
        this.app.use(serverRequestLimit);
        this.app.use(cors({
            origin: this.configureCors
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.resolve(global.appRoot, 'public')));
        this.mountRoutes();
        this.setUpDB();
        this.app.use(this.customErrorHandler);
    }
    setUpDB() {
        mongoose.connect(config_1.config.MONGODB_URL, { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', console.log.bind(console, 'MONGO ERROR'));
    }
    customErrorHandler(err, req, res, next) {
        res
            .status(err.status || constants_1.ResponseStatusCodesEnum.SERVER)
            .json({
            message: err.message || 'Unknown Error',
            code: err.code
        });
    }
    mountRoutes() {
        // this.app.use('/admin', adminRoter);
        // this.app.use('/auth', authRoter);
        // this.app.use('/products', productRoter);
        this.app.use('/users', user_1.userRouter);
    }
}
exports.app = new App().app;
//# sourceMappingURL=app.js.map