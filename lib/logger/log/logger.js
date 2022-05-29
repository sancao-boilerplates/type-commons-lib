"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLogger = exports.Logger = exports.LoggerClass = void 0;
const dotenv = require("dotenv");
const CallerModule = require("../caller");
const logger_builder_1 = require("../builder/logger-builder");
const loger_context_1 = require("./loger-context");
dotenv.config();
class LoggerClass extends loger_context_1.LoggerContext {
    constructor(winston) {
        super();
        this.winston = winston;
        this.winston.silent = process.env.SILENT === 'true';
        this.level = winston.level;
    }
    setInstance(instance) {
        LoggerClass.instance = instance;
    }
    debug(...args) {
        args.push(this.getTraceLog(this.debug));
        this.winston.debug(this.handleNull(args));
    }
    error(...args) {
        args.push(this.getTraceLog(this.error));
        this.winston.error(this.handleNull(args));
    }
    info(...args) {
        args.push(this.getTraceLog(this.info));
        this.winston.info(this.handleNull(args));
    }
    warn(...args) {
        args.push(this.getTraceLog(this.warn));
        this.winston.warn(this.handleNull(args));
    }
    profile(id, meta) {
        return this.winston.profile(id, meta);
    }
    startTimer() {
        return this.winston.startTimer();
    }
    handleNull(args) {
        if (!args) {
            return [];
        }
        args.forEach((arg) => {
            if (arg === null || arg === undefined) {
                arg = 'null';
            }
        });
        return args;
    }
    getTraceLog(func) {
        try {
            return {
                class: `${CallerModule.GetCallerModule(func).callSite.getTypeName()}`,
            };
        }
        catch (err) {
            return {
                class: '',
            };
        }
    }
    /**
     * Singleton responsible for return an Logger instance
     * You can specify a custom json formatter function that will be called everytime before print a log
     * @param [customFormat]
     * @returns instance {Logger}
     */
    static getInstance(customFormat) {
        if (!LoggerClass.instance) {
            LoggerClass.instance = new LoggerClass(logger_builder_1.LoggerBuilder.getLogger(customFormat));
        }
        return LoggerClass.instance;
    }
}
exports.LoggerClass = LoggerClass;
const Logger = LoggerClass.getInstance();
exports.Logger = Logger;
const buildLogger = logger_builder_1.LoggerBuilder.getLogger;
exports.buildLogger = buildLogger;
