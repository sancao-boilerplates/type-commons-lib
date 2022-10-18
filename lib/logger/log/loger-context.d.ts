export declare class LoggerContext {
    /**
     * Sets correlation id
     * The setted correlationId will be printed in every application log
     * @param correlationId: {string}
     */
    static setCorrelationId(correlationId: string): void;
    /**
     * Gets correlation id
     * @returns correlation id {string}
     */
    static getCorrelationId(): string;
    /**
     * Extra data
     * You can set some extra info to you log
     * For Example: You can specify the user loggedId so everytime your user has logged in just add the id here and a key then in every appliction log the user id will be logged
     * @param key: {string}
     * @param value: {string}
     */
    static setLogInfoData(key: string, value: unknown): void;
    /**
     * Extra data
     * Returns the storaged extra log data
     */
    static getLogInfoData(): {
        [key: string]: unknown;
    };
    /**
     * Fields name to be added in list of fields should be hidden on logs, by default the fields will be hidden are: ['password', 'cpf', 'psw', 'senha']
     * @param fields {string[]}
     * @return {void}
     */
    static addLoggerHidenField(fields: Array<string>): void;
    /**
     * Replace fields to be hidden on logs, by default the fields will be hidden are: ['password', 'cpf', 'psw', 'senha']
     * @param fields {string[]}
     * @return {void}
     */
    static setLoggerHidenField(fields: Array<string>): void;
}
