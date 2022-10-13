"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const logger_1 = require("../logger");
const status_code_1 = require("../status-code");
const strategies_1 = require("./strategies");
const generic_serverless_handler_1 = require("./strategies/generic-serverless-handler");
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
     * Define a db connection function which will be called on every call.
     * @param dbConnection
     */
    setDbConnection(dbConnection) {
        AServerlessHandler.dbConnection = dbConnection;
    }
    /**
     * Define the serveless warmup payload
     * @param payload
     * @default {'serverless-plugin-warmup'}
     */
    setWarmupPayload(payload) {
        AServerlessHandler.warmupPayload = payload || AServerlessHandler.warmupPayload;
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
    handler(controllerType, method, options) {
        return (p0, p1, callback) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const start = new Date();
            try {
                logger_1.Logger.debug(p0);
                logger_1.Logger.debug(p1);
                if (p1 && p1['callbackWaitsForEmptyEventLoop']) {
                    p1['callbackWaitsForEmptyEventLoop'] = false;
                }
                if (p0['source'] === AServerlessHandler.warmupPayload) {
                    logger_1.Logger.debug('Warmup Executed!');
                    return callback(null, {
                        statusCode: status_code_1.HttpStatusCode.NO_CONTENT,
                        body: null,
                    });
                }
                const handler = this.getHandlerProvider(options);
                const dbConnection = (options === null || options === void 0 ? void 0 : options.dbConnection) || AServerlessHandler.dbConnection;
                const response = yield handler.applyCall(controllerType, method, p0, p1, dbConnection);
                logger_1.Logger.info('Lambda executed');
                if (callback) {
                    logger_1.Logger.info('Calling callback function', { response });
                    callback(null, response);
                    return;
                }
                return response;
            }
            catch (err) {
                logger_1.Logger.error('Serverless Handler Error', err);
                if (callback) {
                    logger_1.Logger.info('Calling callback response function');
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
    getHandlerProvider(options) {
        const provider = (options === null || options === void 0 ? void 0 : options.serverlessProvider) || AServerlessHandler.provider;
        dependency_injector_1.Injector.set(types_1.ServerlessProvider.GCP, new strategies_1.GcpServerlessHandler());
        if (types_1.ServerlessProvider.GCP == provider) {
            return new strategies_1.GcpServerlessHandler();
        }
        return new strategies_1.AwsServerlessHandler();
    }
}
AServerlessHandler.provider = types_1.ServerlessProvider.AWS;
AServerlessHandler.warmupPayload = 'serverless-plugin-warmup';
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", generic_serverless_handler_1.GenericServerlessHandler)
], AServerlessHandler.prototype, "getHandlerProvider", null);
const ServerlessHandler = new AServerlessHandler();
exports.ServerlessHandler = ServerlessHandler;
