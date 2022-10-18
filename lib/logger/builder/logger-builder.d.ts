import { Logger } from 'winston';
export declare class LoggerBuilder {
    private static loadInfoItems;
    private static shouldHide;
    private static defaultCustom;
    /**
     * You can specify a custom json formatter function that will be called everytime before print a log
     * @param [customFormat]
     * @returns instance {Logger}
     */
    static getLogger(custom?: (info: any, opts?: any) => any): Logger;
    private static getLogLevel;
    /**
     * Creates local winston logger
     * @returns local winston logger {Logger}
     */
    private static createLocalWinstonLogger;
    /**
     * Creates aws winston logger
     * @returns aws winston logger {Logger}
     */
    private static createDefaultWinstonLogger;
    /**
     * Customs json format
     * @returns
     */
    private static customJsonFormat;
}
