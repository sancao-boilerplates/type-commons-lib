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
exports.DigitalMQ = void 0;
var uuid_1 = require("uuid");
var amqplib_1 = require("amqplib");
var logger_1 = require("../../logger");
var event_constants_1 = require("./event-constants");
var DigitalMQ = /** @class */ (function () {
    /**
     * Creates an instance of digital mq.
     * @param connectionData {ConnectionData}
     */
    function DigitalMQ(connectionData) {
        this.connData = connectionData;
        this.connData.port = connectionData.port || event_constants_1.EventConstants.PORT;
        this.connData.user = connectionData.user || event_constants_1.EventConstants.USER;
        this.connData.password = connectionData.password || event_constants_1.EventConstants.PASSWORD;
        this.connData.reconnect = connectionData.reconnect === false ? false : event_constants_1.EventConstants.RECONNECT;
    }
    /**
     * Inits digital mq
     * @param connectionData {ConnectionData}
     * @returns init
     */
    DigitalMQ.init = function (connectionData) {
        if (!connectionData) {
            throw new Error('For RabbitMQ please provide connection data');
        }
        return new DigitalMQ(connectionData);
    };
    DigitalMQ.prototype.getConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.conn) return [3 /*break*/, 2];
                        options = {
                            hostname: this.connData.host,
                            port: this.connData.port,
                            username: this.connData.user,
                            password: this.connData.password,
                        };
                        _a = this;
                        return [4 /*yield*/, amqplib_1.connect(options)];
                    case 1:
                        _a.conn = _b.sent();
                        this.conn.on('error', this.connectionError);
                        this.conn.on('close', this.connectionClose);
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.conn];
                }
            });
        });
    };
    DigitalMQ.prototype.connectionError = function (err) {
        logger_1.Logger.error('RabbitMQ connection error', { action: 'rabbit-event', event: 'Error', data: err }, err);
    };
    DigitalMQ.prototype.connectionClose = function (msg) {
        var _this = this;
        logger_1.Logger.debug('RabbitMQ connection closed', { action: 'rabbit-event', event: 'connection-close', data: msg });
        if (this.connData && this.connData.reconnect) {
            this.conn = undefined;
            this.getConnection().then(function (conn) {
                _this.conn = conn;
            });
        }
    };
    DigitalMQ.prototype.getChannel = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConnection()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.createChannel()];
                    case 2:
                        channel = _a.sent();
                        channel.on('error', this.channeError(callback));
                        channel.on('close', this.channelClosed);
                        return [2 /*return*/, channel];
                }
            });
        });
    };
    DigitalMQ.prototype.channelClosed = function () {
        logger_1.Logger.debug('Channel successfully closed', { action: 'rabbit-event', event: 'chennel-closed' });
    };
    DigitalMQ.prototype.channeError = function (callback) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            logger_1.Logger.error('channel error', { action: 'rabbit-event', event: 'chennel-error', data: args });
            if (callback) {
                callback(args);
            }
        };
    };
    /**
     *
     * @param queue an string that represents the desired queue to listener
     * @param callback the desired function wich will process a new received message
     * @param errorCallback an optionl function that will be called in case some erro while receiving a message
     */
    DigitalMQ.prototype.listenForEvents = function (queue, callback, errorCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var channel, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getChannel(errorCallback)];
                    case 1:
                        channel = _a.sent();
                        channel.assertQueue(queue.toString());
                        channel.consume(queue.toString(), this.channelConsume(channel, callback, errorCallback));
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        logger_1.Logger.error('Error while listening even message', err_1);
                        if (errorCallback) {
                            errorCallback(err_1);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DigitalMQ.prototype.channelConsume = function (channel, callback, errorCallback) {
        return function (message) {
            try {
                if (message) {
                    logger_1.Logger.debug('New Rabbit Message Income', { action: 'event-message', message: message });
                    channel.ack(message);
                    var body = DigitalMQ.parseContent(message);
                    logger_1.Logger.debug('Calling event listener callback', { action: 'event-message-callback', body: body });
                    callback(body);
                }
            }
            catch (err) {
                logger_1.Logger.error('Error while processing message event', err);
                if (errorCallback) {
                    errorCallback(err);
                }
            }
        };
    };
    DigitalMQ.parseContent = function (message) {
        try {
            var body = JSON.parse(message.content.toString());
            logger_1.Logger.debug('Income Event Message Parsed', body);
            return body;
        }
        catch (err) {
            return message.content.toString();
        }
    };
    DigitalMQ.prototype.publishMessage = function (queue, message) {
        return __awaiter(this, void 0, void 0, function () {
            var channel, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        message.messageId = message.messageId ? message.messageId : uuid_1.v4();
                        return [4 /*yield*/, this.getChannel()];
                    case 1:
                        channel = _a.sent();
                        return [4 /*yield*/, channel.assertQueue(queue)];
                    case 2:
                        _a.sent();
                        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
                        return [4 /*yield*/, channel.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, message.messageId];
                    case 4:
                        err_2 = _a.sent();
                        logger_1.Logger.error('Error while publishing message', err_2);
                        throw err_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DigitalMQ.prototype.sendMessage = function (queue, message) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publishMessage(queue, message)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DigitalMQ.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.conn.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DigitalMQ;
}());
exports.DigitalMQ = DigitalMQ;
