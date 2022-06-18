import { Injector, ObjectType } from '../dependency-injector';
import { HttpStatusCode } from '../status-code';
import { AwsServerlessHandler, GcpServerlessHandler } from './strategies';
import { GenericServerlessHandler } from './strategies/generic-serverless-handler';
import { ServerlessHandlerOptions, ServerlessProvider } from './types';

class AServerlessHandler {
    private static provider: ServerlessProvider = ServerlessProvider.AWS;
    private static dbConnection?: Function;
    /**
     * Define the default cloud serverless Provided. Currently accept AWS or GCP.
     * Use ServerlessProvider
     * @param provider
     */
    public setProvider(provider: ServerlessProvider) {
        AServerlessHandler.provider = provider ?? ServerlessProvider.AWS;
    }

    /**
     * Define a db connection function which will be called on every call.
     * @param dbConnection
     */
    public setDbConnection(dbConnection: Function) {
        AServerlessHandler.dbConnection = dbConnection;
    }

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
    public handler<T>(controllerType: ObjectType<T>, method: string, options?: ServerlessHandlerOptions): (p0: unknown, p1: unknown, callback?: Function) => unknown {
        return async (p0: unknown, p1: unknown, callback?: Function) => {
            const start = new Date();
            try {
                const handler = this.getHandlerProvider(options);
                const dbConnection = options?.dbConnection || AServerlessHandler.dbConnection;
                const response = await handler.applyCall(controllerType, method, p0, p1, dbConnection);
                if (callback) {
                    callback(null, response);
                    return;
                }
                return response;
            } catch (err) {
                if (callback) {
                    callback({
                        statusCode: err.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
                    });
                    return;
                }
                return {
                    statusCode: err.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
                };
            }
        };
    }

    private getHandlerProvider(options?: ServerlessHandlerOptions): GenericServerlessHandler<unknown, unknown> {
        const provider = options?.serverlessProvider || AServerlessHandler.provider;

        Injector.set(ServerlessProvider.GCP, new GcpServerlessHandler());
        if (ServerlessProvider.GCP == provider) {
            return new GcpServerlessHandler();
        }
        return new AwsServerlessHandler();
    }
}
const ServerlessHandler = new AServerlessHandler();
export { ServerlessHandler };
