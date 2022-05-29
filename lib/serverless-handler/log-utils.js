"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogUtils = void 0;
const logger_1 = require("../logger");
class LogUtils {
    static doLog(log) {
        var _a;
        switch ((_a = process.env.REQUEST_RESPONSE_LOG_LEVEL) !== null && _a !== void 0 ? _a : logger_1.LogLevel.DEBUG) {
            case logger_1.LogLevel.ERROR:
                return logger_1.Logger.error(log);
            case logger_1.LogLevel.WARN:
                return logger_1.Logger.warn(log);
            case logger_1.LogLevel.INFO:
                return logger_1.Logger.info(log);
            default:
                return logger_1.Logger.debug(log);
        }
    }
}
exports.LogUtils = LogUtils;
