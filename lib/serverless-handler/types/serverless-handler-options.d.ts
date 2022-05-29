import { ServerlessProvider } from './serverless-provider-enum';
export interface ServerlessHandlerOptions {
    /**
     * Use it to connect your database, inform the promise wichi will connect to you database.
     * @dbConection
     */
    dbConection: Promise<unknown>;
    /**
     * Inform the serverless cloud provider, you can set it globally throug ServerlessHandler.setProvider method or specific.
     * Note, if you provide the serverless provider here the globals value will be ingnored.
     * @serverlessProvider
     */
    serverlessProvider: ServerlessProvider;
}
