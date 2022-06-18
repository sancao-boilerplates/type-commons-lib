import { ObjectType } from '../dependency-injector';
import { ServerlessHandlerOptions, ServerlessProvider } from './types';
declare class AServerlessHandler {
    private static provider;
    private static dbConnection?;
    /**
     * Define the default cloud serverless Provided. Currently accept AWS or GCP.
     * Use ServerlessProvider
     * @param provider
     */
    setProvider(provider: ServerlessProvider): void;
    /**
     * Define a db connection function which will be called on every call.
     * @param dbConnection
     */
    setDbConnection(dbConnection: Function): void;
    /**
     * Provide your controller type
     * @param controllerType
     *
     * The name of the method will be called
     * @param method
     *
     * Info if you have a connection DB or any other promise which is needed to be resolved before you function,
     * also you can specify your cloud function provider
     * @param options
     *
     * Will be returned the serverlerss handler function
     * @returns
     */
    handler<T>(controllerType: ObjectType<T>, method: string, options?: ServerlessHandlerOptions): (p0: unknown, p1: unknown, callback?: Function) => unknown;
    private getHandlerProvider;
}
declare const ServerlessHandler: AServerlessHandler;
export { ServerlessHandler };
