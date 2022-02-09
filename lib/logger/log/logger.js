"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLogger = exports.Logger = exports.LoggerClass = void 0;
var dotenv = require("dotenv");
var CallerModule = require("../caller");
var logger_builder_1 = require("../builder/logger-builder");
var loger_context_1 = require("./loger-context");
dotenv.config();
var LoggerClass = /** @class */ (function (_super) {
    __extends(LoggerClass, _super);
    function LoggerClass(winston) {
        var _this = _super.call(this) || this;
        _this.winston = winston;
        _this.winston.silent = process.env.SILENT === 'true';
        _this.level = winston.level;
        return _this;
    }
    LoggerClass.prototype.setInstance = function (instance) {
        LoggerClass.instance = instance;
    };
    LoggerClass.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.push(this.getTraceLog(this.debug));
        this.winston.debug(this.handleNull(args));
    };
    LoggerClass.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.push(this.getTraceLog(this.error));
        this.winston.error(this.handleNull(args));
    };
    LoggerClass.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.push(this.getTraceLog(this.info));
        this.winston.info(this.handleNull(args));
    };
    LoggerClass.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.push(this.getTraceLog(this.warn));
        this.winston.warn(this.handleNull(args));
    };
    LoggerClass.prototype.profile = function (id, meta) {
        return this.winston.profile(id, meta);
    };
    LoggerClass.prototype.startTimer = function () {
        return this.winston.startTimer();
    };
    LoggerClass.prototype.handleNull = function (args) {
        if (!args) {
            return [];
        }
        args.forEach(function (arg) {
            if (arg === null || arg === undefined) {
                arg = 'null';
            }
        });
        return args;
    };
    LoggerClass.prototype.getTraceLog = function (func) {
        try {
            return {
                class: "" + CallerModule.GetCallerModule(func).callSite.getTypeName(),
            };
        }
        catch (err) {
            return {
                class: '',
            };
        }
    };
    /**
     * Singleton responsible for return an Logger instance
     * You can specify a custom json formatter function that will be called everytime before print a log
     * @param [customFormat]
     * @returns instance {Logger}
     */
    LoggerClass.getInstance = function (customFormat) {
        if (!LoggerClass.instance) {
            LoggerClass.instance = new LoggerClass(logger_builder_1.LoggerBuilder.getLogger(customFormat));
        }
        return LoggerClass.instance;
    };
    return LoggerClass;
}(loger_context_1.LoggerContext));
exports.LoggerClass = LoggerClass;
var Logger = LoggerClass.getInstance();
exports.Logger = Logger;
var buildLogger = logger_builder_1.LoggerBuilder.getLogger;
exports.buildLogger = buildLogger;
