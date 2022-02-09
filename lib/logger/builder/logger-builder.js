"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerBuilder = void 0;
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
var winston_1 = require("winston");
var uuid_1 = require("uuid");
var environment_1 = require("../../env/environment");
var loger_context_1 = require("../log/loger-context");
var LoggerBuilder = /** @class */ (function () {
    function LoggerBuilder() {
    }
    LoggerBuilder.loadInfoItems = function (item, info, text) {
        if (item instanceof TypeError || item instanceof Error) {
            info['errorMessage'] = item.message;
            info['stackError'] = item.stack;
        }
        else if (typeof item === 'string') {
            text = "" + (!text ? item : text + " " + item);
        }
        else if (typeof item === 'object') {
            Object.keys(item).forEach(function (key) {
                info[key] = item[key];
            });
        }
        return text;
    };
    /**
     * You can specify a custom json formatter function that will be called everytime before print a log
     * @param [customFormat]
     * @returns instance {Logger}
     */
    LoggerBuilder.getLogger = function (custom) {
        return process.env.NODE_ENV === environment_1.Environment.LOCAL ? LoggerBuilder.createLocalWinstonLogger(custom) : LoggerBuilder.createDefaultWinstonLogger(custom);
    };
    LoggerBuilder.getLogLevel = function () {
        return process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : 'debug';
    };
    /**
     * Creates local winston logger
     * @returns local winston logger {Logger}
     */
    LoggerBuilder.createLocalWinstonLogger = function (custom) {
        if (custom === void 0) { custom = LoggerBuilder.defaultCustom; }
        return winston_1.createLogger({
            level: LoggerBuilder.getLogLevel(),
            format: winston_1.format.combine(winston_1.format.json(), LoggerBuilder.customJsonFormat(custom), winston_1.format.timestamp(), winston_1.format.prettyPrint()),
            transports: [new winston_1.transports.Console()],
        });
    };
    /**
     * Creates aws winston logger
     * @returns aws winston logger {Logger}
     */
    LoggerBuilder.createDefaultWinstonLogger = function (custom) {
        if (custom === void 0) { custom = LoggerBuilder.defaultCustom; }
        return winston_1.createLogger({
            level: LoggerBuilder.getLogLevel(),
            format: winston_1.format.combine(winston_1.format.timestamp(), LoggerBuilder.customJsonFormat(custom), winston_1.format.json()),
            transports: [new winston_1.transports.Console()],
        });
    };
    /**
     * Customs json format
     * @returns
     */
    LoggerBuilder.customJsonFormat = function (custom) {
        if (custom === void 0) { custom = LoggerBuilder.defaultCustom; }
        var customJson = winston_1.format(custom);
        return customJson();
    };
    LoggerBuilder.defaultCustom = function (info, opts) {
        var e_1, _a, e_2, _b;
        if (opts.yell) {
            info.message = info.message.toUpperCase();
        }
        else if (opts.whisper) {
            info.message = info.message.toLowerCase();
        }
        info.level = info.level.toUpperCase();
        info.level = info.level.toUpperCase();
        info.correlationId = loger_context_1.LoggerContext.getCorrelationId() || uuid_1.v4();
        var extraData = loger_context_1.LoggerContext.getLogInfoData();
        if (extraData) {
            Object.keys(extraData).forEach(function (key) {
                info[key] = extraData[key];
            });
        }
        var text;
        try {
            for (var _c = __values(info.message), _d = _c.next(); !_d.done; _d = _c.next()) {
                var item = _d.value;
                if (!item) {
                    continue;
                }
                if (typeof item === 'string') {
                    text = "" + (!text ? item : text + " " + item);
                }
                else if (Array.isArray(item)) {
                    try {
                        for (var item_1 = (e_2 = void 0, __values(item)), item_1_1 = item_1.next(); !item_1_1.done; item_1_1 = item_1.next()) {
                            var arrayItem = item_1_1.value;
                            text = LoggerBuilder.loadInfoItems(arrayItem, info, text);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (item_1_1 && !item_1_1.done && (_b = item_1.return)) _b.call(item_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                else if (typeof item === 'object') {
                    text = LoggerBuilder.loadInfoItems(item, info, text);
                }
                else {
                    info['__data'] = item;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        delete info.message;
        info.message = text;
        return info;
    };
    return LoggerBuilder;
}());
exports.LoggerBuilder = LoggerBuilder;
