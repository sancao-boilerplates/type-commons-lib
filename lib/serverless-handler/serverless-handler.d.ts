import { ObjectType } from '../dependency-injector';
import { ServerlessHandlerOptions, ServerlessProvider } from './types';
declare class AServerlessHandler {
    static provider: ServerlessProvider;
    /**
     * Define the default cloud serverless Provided. Currently accept AWS or GCP.
     * Use ServerlessProvider
     * @param provider
     */
    static setProvider(provider: ServerlessProvider): void;
    /**
     * Provide your controller type
     * @param controllerType
     *
     * The name of the method will be called
     * @param method
     *
     * Infor if you have a connection DB or any other promise wich is nedded to be resolved before you function,
     * also you can specify your cloud function provider
     * @param options
     *
     * Will be returned the serverlerss handler function
     * @returns
     */
    handler<T>(controllerType: ObjectType<T>, method: string, options?: ServerlessHandlerOptions): (p0: unknown, p1: unknown) => unknown;
    private getHandlerProvicer;
}
declare const ServerlessHandler: AServerlessHandler;
export { ServerlessHandler };
