"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerBuilder = void 0;
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
const winston_1 = require("winston");
const uuid_1 = require("uuid");
const environment_1 = require("../../env/environment");
const loger_context_1 = require("../log/loger-context");
const constants_1 = require("../../constants");
const logger_configs_1 = require("../log/logger-configs");
class LoggerBuilder {
    static loadInfoItems(item, info, text) {
        if (item instanceof TypeError || item instanceof Error) {
            info['errorMessage'] = item.message;
            info['stackError'] = item.stack;
        }
        else if (typeof item === 'string') {
            text = `${!text ? item : `${text} ${item}`}`;
        }
        else if (typeof item === 'object') {
            Object.keys(item).forEach((key) => {
                if (LoggerBuilder.shouldHide(key) && !(process.env.SHOW_SENSETIVE_LOG == 'true')) {
                    info[key] = constants_1.LoggerConstants.HidenLogFieldLabel;
                }
                else {
                    info[key] = item[key];
                }
            });
        }
        return text;
    }
    static shouldHide(key) {
        key = key || '';
        key = key.toLocaleLowerCase();
        return logger_configs_1.LoggerConfigs.hiddenFields.includes(key);
    }
    /**
     * You can specify a custom json formatter function that will be called everytime before print a log
     * @param [customFormat]
     * @returns instance {Logger}
     */
    static getLogger(custom) {
        return process.env.NODE_ENV === environment_1.Environment.LOCAL ? LoggerBuilder.createLocalWinstonLogger(custom) : LoggerBuilder.createDefaultWinstonLogger(custom);
    }
    static getLogLevel() {
        return process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : 'debug';
    }
    /**
     * Creates local winston logger
     * @returns local winston logger {Logger}
     */
    static createLocalWinstonLogger(custom = LoggerBuilder.defaultCustom) {
        return (0, winston_1.createLogger)({
            level: LoggerBuilder.getLogLevel(),
            format: winston_1.format.combine(winston_1.format.json(), LoggerBuilder.customJsonFormat(custom), winston_1.format.timestamp(), winston_1.format.prettyPrint()),
            transports: [new winston_1.transports.Console()],
        });
    }
    /**
     * Creates aws winston logger
     * @returns aws winston logger {Logger}
     */
    static createDefaultWinstonLogger(custom = (info, opts) => LoggerBuilder.defaultCustom(info, opts)) {
        return (0, winston_1.createLogger)({
            level: LoggerBuilder.getLogLevel(),
            format: winston_1.format.combine(winston_1.format.timestamp(), LoggerBuilder.customJsonFormat(custom), winston_1.format.json()),
            transports: [new winston_1.transports.Console()],
        });
    }
    /**
     * Customs json format
     * @returns
     */
    static customJsonFormat(custom = (info, opts) => LoggerBuilder.defaultCustom(info, opts)) {
        const customJson = (0, winston_1.format)(custom);
        return customJson();
    }
}
exports.LoggerBuilder = LoggerBuilder;
LoggerBuilder.defaultCustom = (info, opts) => {
    if (opts.yell) {
        info.message = info.message.toUpperCase();
    }
    else if (opts.whisper) {
        info.message = info.message.toLowerCase();
    }
    info.level = info.level.toUpperCase();
    info.level = info.level.toUpperCase();
    info.correlationId = loger_context_1.LoggerContext.getCorrelationId() || (0, uuid_1.v4)();
    const extraData = loger_context_1.LoggerContext.getLogInfoData();
    if (extraData) {
        Object.keys(extraData).forEach((key) => {
            info[key] = extraData[key];
        });
    }
    let text;
    for (const item of info.message) {
        if (!item) {
            continue;
        }
        if (typeof item === 'string') {
            text = `${!text ? item : `${text} ${item}`}`;
        }
        else if (Array.isArray(item)) {
            for (const arrayItem of item) {
                text = LoggerBuilder.loadInfoItems(arrayItem, info, text);
            }
        }
        else if (typeof item === 'object') {
            text = LoggerBuilder.loadInfoItems(item, info, text);
        }
        else {
            info['__data'] = item;
        }
    }
    delete info.message;
    info.message = text;
    return info;
};
