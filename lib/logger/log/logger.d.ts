import * as Winston from 'winston';
import { LoggerBuilder } from '../builder/logger-builder';
import { LoggerContext } from './loger-context';
export declare class LoggerClass extends LoggerContext {
    private winston;
    readonly level: string;
    private static instance;
    constructor(winston: Winston.Logger);
    setInstance(instance: LoggerClass): void;
    debug(...args: unknown[]): void;
    error(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    profile(id: string | number, meta?: Winston.LogEntry): Winston.Logger;
    startTimer(): Winston.Profiler;
    private handleNull;
    private getTraceLog;
    /**
     * Singleton responsible for return an Logger instance
     * You can specify a custom json formatter function that will be called everytime before print a log
     * @param [customFormat]
     * @returns instance {Logger}
     */
    static getInstance(customFormat?: (info: {
        [key: string]: any;
    }, opts?: any) => any): LoggerClass;
}
declare const Logger: LoggerClass;
declare const buildLogger: typeof LoggerBuilder.getLogger;
export { Logger, buildLogger };
