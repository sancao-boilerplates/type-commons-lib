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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsClient = void 0;
var aws_sdk_1 = require("aws-sdk");
var console_1 = require("console");
var logger_1 = require("../../logger");
var sqs_constants_1 = require("./sqs-constants");
var SqsClient = /** @class */ (function () {
    function SqsClient() {
    }
    SqsClient.init = function (options) {
        if (SqsClient.isInitialized)
            return;
        var config = {
            apiVersion: (options && options.apiVersion) || sqs_constants_1.SqsConstants.ApiVersion,
            region: (options && options.region) || sqs_constants_1.SqsConstants.Region,
        };
        if (options && options.credentials) {
            config.credentials = options.credentials;
        }
        SqsClient.sqs = new aws_sdk_1.SQS(config);
        SqsClient.isInitialized = true;
    };
    SqsClient.validateSqsInitialized = function () {
        if (!SqsClient.isInitialized) {
            SqsClient.init();
        }
    };
    SqsClient.sendMessage = function (queueUrl, body, options) {
        return __awaiter(this, void 0, void 0, function () {
            var message, messageRequest, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console_1.assert(queueUrl);
                        console_1.assert(body);
                        message = void 0;
                        if (typeof body === 'string') {
                            message = body;
                        }
                        else {
                            message = JSON.stringify(body);
                        }
                        SqsClient.validateSqsInitialized();
                        messageRequest = {
                            QueueUrl: queueUrl,
                            MessageBody: message,
                            DelaySeconds: options && options.delaySeconds ? options.delaySeconds : 0,
                            MessageAttributes: options && options.messageAttributes ? options.messageAttributes : null,
                        };
                        return [4 /*yield*/, SqsClient.sqs.sendMessage(messageRequest).promise()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.MessageId];
                    case 2:
                        err_1 = _a.sent();
                        logger_1.Logger.error("Error while posting sqs message for queue: " + queueUrl, err_1);
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SqsClient.receiveMessage = function (queueUrl, options) {
        return __awaiter(this, void 0, void 0, function () {
            var request, result, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        SqsClient.validateSqsInitialized();
                        console_1.assert(queueUrl);
                        request = {
                            QueueUrl: queueUrl,
                            MaxNumberOfMessages: options && options.maxNumberOfMessages ? options.maxNumberOfMessages : 1,
                        };
                        return [4 /*yield*/, SqsClient.sqs.receiveMessage(request).promise()];
                    case 1:
                        result = _a.sent();
                        if (result.Messages.length === 0) {
                            return [2 /*return*/, []];
                        }
                        response = result.Messages.map(function (m) { return JSON.parse(m.Body); });
                        if (response.length === 1) {
                            return [2 /*return*/, response[0]];
                        }
                        return [2 /*return*/, response];
                    case 2:
                        err_2 = _a.sent();
                        logger_1.Logger.error("Error while receiving sqs message from queue: " + queueUrl, err_2);
                        throw err_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SqsClient.isInitialized = false;
    __decorate([
        logger_1.log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object]),
        __metadata("design:returntype", Promise)
    ], SqsClient, "sendMessage", null);
    __decorate([
        logger_1.log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], SqsClient, "receiveMessage", null);
    return SqsClient;
}());
exports.SqsClient = SqsClient;
