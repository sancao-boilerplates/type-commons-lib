import { Injector, ObjectType } from '../dependency-injector';

import { Logger } from '../logger';
import { HttpStatusCode } from '../status-code';
import { AwsServerlessHandler, GcpServerlessHandler } from './strategies';
import { GenericServerlessHandler } from './strategies/generic-serverless-handler';
import { AwsContext, AwsHttpEvent, ServerlessHandlerOptions, ServerlessProvider } from './types';

class AServerlessHandler {
    static provider: ServerlessProvider = ServerlessProvider.AWS;

    /**
     * Define the default cloud serverless Provided. Currently accept AWS or GCP.
     * Use ServerlessProvider
     * @param provider
     */
    static setProvider(provider: ServerlessProvider) {
        AServerlessHandler.provider = provider ?? ServerlessProvider.AWS;
    }

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
    public handler<T>(controllerType: ObjectType<T>, method: string, options?: ServerlessHandlerOptions): (p0: unknown, p1: unknown) => unknown {
        return async (p0: unknown, p1: unknown) => {
            const start = new Date();
            try {
                const handler = this.getHandlerProvicer(options);

                const response = await handler.applyCall(controllerType, method, p0, p1);

                return response;
            } catch (err) {
                return {
                    statusCode: err.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
                };
            }
        };
    }

    private getHandlerProvicer(options?: ServerlessHandlerOptions): GenericServerlessHandler<unknown, unknown> {
        const provider = options.serverlessProvider ?? AServerlessHandler.provider;

        Injector.set(ServerlessProvider.GCP, new GcpServerlessHandler());
        if (ServerlessProvider.GCP == provider) {
            return new GcpServerlessHandler();
        }
        return new AwsServerlessHandler();
    }
}
const ServerlessHandler = new AServerlessHandler();
export { ServerlessHandler };
