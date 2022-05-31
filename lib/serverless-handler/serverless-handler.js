"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerlessHandler = void 0;
const dependency_injector_1 = require("../dependency-injector");
const status_code_1 = require("../status-code");
const strategies_1 = require("./strategies");
const types_1 = require("./types");
class AServerlessHandler {
    /**
     * Define the default cloud serverless Provided. Currently accept AWS or GCP.
     * Use ServerlessProvider
     * @param provider
     */
    setProvider(provider) {
        AServerlessHandler.provider = provider !== null && provider !== void 0 ? provider : types_1.ServerlessProvider.AWS;
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
    handler(controllerType, method, options) {
        return (p0, p1, callback) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const start = new Date();
            try {
                const handler = this.getHandlerProvicer(options);
                const response = yield handler.applyCall(controllerType, method, p0, p1, options === null || options === void 0 ? void 0 : options.dbConection);
                if (callback) {
                    callback(null, response);
                    return;
                }
                return response;
            }
            catch (err) {
                if (callback) {
                    callback({
                        statusCode: (_a = err.status) !== null && _a !== void 0 ? _a : status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR,
                    });
                    return;
                }
                return {
                    statusCode: (_b = err.status) !== null && _b !== void 0 ? _b : status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR,
                };
            }
        });
    }
    getHandlerProvicer(options) {
        const provider = (options === null || options === void 0 ? void 0 : options.serverlessProvider) || AServerlessHandler.provider;
        dependency_injector_1.Injector.set(types_1.ServerlessProvider.GCP, new strategies_1.GcpServerlessHandler());
        if (types_1.ServerlessProvider.GCP == provider) {
            return new strategies_1.GcpServerlessHandler();
        }
        return new strategies_1.AwsServerlessHandler();
    }
}
AServerlessHandler.provider = types_1.ServerlessProvider.AWS;
const ServerlessHandler = new AServerlessHandler();
exports.ServerlessHandler = ServerlessHandler;
