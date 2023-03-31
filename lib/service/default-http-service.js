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
exports.DefaultHttpService = void 0;
const generic_service_1 = require("./generic-service");
class DefaultHttpService extends generic_service_1.HttpService {
    static post(url, payload, requestConfig, requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.instance.post(url, payload, requestConfig, requestOptions);
            return resp;
        });
    }
    static patch(url, payload, requestConfig, requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.instance.patch(url, payload, requestConfig, requestOptions);
            return resp;
        });
    }
    static delete(url, payload, requestConfig, requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.instance.delete(url, payload, requestConfig, requestOptions);
            return resp;
        });
    }
    static put(url, payload, requestConfig, requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.instance.put(url, payload, requestConfig, requestOptions);
            return resp;
        });
    }
    static get(url, requestConfig, requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.instance.get(url, requestConfig, requestOptions);
            return resp;
        });
    }
}
DefaultHttpService.instance = new DefaultHttpService();
exports.DefaultHttpService = DefaultHttpService;
