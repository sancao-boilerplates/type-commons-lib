"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerContext = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cls_1 = require("../../cls");
const logger_configs_1 = require("./logger-configs");
class LoggerContext {
    /**
     * Sets correlation id
     * The setted correlationId will be printed in every application log
     * @param correlationId: {string}
     */
    static setCorrelationId(correlationId) {
        cls_1.StorageContext.scope();
        cls_1.StorageContext.setContextValue('correlationId', correlationId, cls_1.ClsContextNamespace.LOGGER);
    }
    /**
     * Gets correlation id
     * @returns correlation id {string}
     */
    static getCorrelationId() {
        const value = cls_1.StorageContext.getContextValue('correlationId', cls_1.ClsContextNamespace.LOGGER);
        return value;
    }
    /**
     * Extra data
     * You can set some extra info to you log
     * For Example: You can specify the user loggedId so everytime your user has logged in just add the id here and a key then in every appliction log the user id will be logged
     * @param key: {string}
     * @param value: {string}
     */
    static setLogInfoData(key, value) {
        const data = LoggerContext.getLogInfoData();
        data[key] = value;
        cls_1.StorageContext.setContextValue('extraLogInfo', data, cls_1.ClsContextNamespace.LOGGER);
    }
    /**
     * Extra data
     * Returns the storaged extra log data
     */
    static getLogInfoData() {
        const data = cls_1.StorageContext.getContextValue('extraLogInfo', cls_1.ClsContextNamespace.LOGGER);
        return data || {};
    }
    /**
     * Fields name to be added in list of fields should be hidden on logs, by default the fields will be hidden are: ['password', 'cpf', 'psw', 'senha']
     * @param fields {string[]}
     * @return {void}
     */
    static addLoggerHidenField(fields) {
        fields = fields || [];
        logger_configs_1.LoggerConfigs.hiddenFields = logger_configs_1.LoggerConfigs.hiddenFields.concat(fields);
    }
    /**
     * Replace fields to be hidden on logs, by default the fields will be hidden are: ['password', 'cpf', 'psw', 'senha']
     * @param fields {string[]}
     * @return {void}
     */
    static setLoggerHidenField(fields) {
        fields = fields || [];
        logger_configs_1.LoggerConfigs.hiddenFields = fields;
    }
}
exports.LoggerContext = LoggerContext;
