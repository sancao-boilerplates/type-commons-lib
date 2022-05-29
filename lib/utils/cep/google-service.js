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
exports.GoogleService = void 0;
const service_1 = require("../../service");
const logger_1 = require("../../logger");
const constants_1 = require("../../constants");
class GoogleService extends service_1.HttpService {
    constructor() {
        super({
            baseUrl: 'https://maps.googleapis.com',
        });
    }
    setGoogleApiKey() {
        var _a;
        if (((_a = this.gKey) === null || _a === void 0 ? void 0 : _a.length) >= 10) {
            return;
        }
        this.gKey = constants_1.AppConstants.GOOGLE_API_KEY;
        if (!this.gKey || this.gKey.length < 10) {
            throw new Error('Missing GOOGLE_API_KEY environment variable key.');
        }
    }
    getAddressFromGoogle(address) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setGoogleApiKey();
            try {
                address = encodeURI(address);
                const result = yield this.get(`maps/api/geocode/json?address=${address},BR&key=${this.gKey}`);
                return result;
            }
            catch (err) {
                logger_1.Logger.error(`Error while getting address (${address}) from google `, err);
                throw err;
            }
        });
    }
    getAddressFromGeoLocation(lat, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setGoogleApiKey();
            try {
                const result = yield this.get(`maps/api/geocode/json?latlng=${lat},${lng}&key=${this.gKey}`);
                return result;
            }
            catch (error) {
                logger_1.Logger.error(`Error while getting geolocation (${lat},${lng}) from google `, error);
                throw error;
            }
        });
    }
}
exports.GoogleService = GoogleService;
