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
exports.CepUtils = void 0;
const google_service_1 = require("./google-service");
const logger_1 = require("../../logger");
const regex_utils_1 = require("../regex-utils");
const correios_serivce_1 = require("./correios-serivce");
const constants_1 = require("../../constants");
const correiosService = new correios_serivce_1.CorreiosService();
const googleService = new google_service_1.GoogleService();
class CepUtils {
    static getAddressFrom(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                cep = CepUtils.validateCep(cep);
                let result = yield correiosService.getFromCorreios(cep);
                result = yield CepUtils.loadGeoLocation(result);
                return result;
            }
            catch (err) {
                logger_1.Logger.error('Error whule getting address from cep', err);
                throw err;
            }
        });
    }
    static loadGeoLocation(address) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!address || !constants_1.AppConstants.GOOGLE_API_KEY) {
                    return address;
                }
                let googleResponse = yield CepUtils.getGeoLocation(address.cep);
                if (!googleResponse || googleResponse.results.length === 0) {
                    googleResponse = yield CepUtils.getGeoLocation(`${address.neighborhood}${address.state}`);
                }
                if (googleResponse && googleResponse.results.length > 0) {
                    address.geoLocation = {
                        latitude: googleResponse.results[0].geometry.location.lat,
                        longitude: googleResponse.results[0].geometry.location.lng,
                        googleResponse,
                    };
                }
                return address;
            }
            catch (err) {
                logger_1.Logger.error(err);
                return address;
            }
        });
    }
    static getGeoLocation(address) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const googleResponse = yield googleService.getAddressFromGoogle(address);
                return googleResponse;
            }
            catch (err) {
                logger_1.Logger.error(err);
                return null;
            }
        });
    }
    static validateCep(cep) {
        if (!cep) {
            throw new Error(`Invalid cep! ${cep}, cep must have 8 digits`);
        }
        cep = cep.replace(/-/g, '');
        if (!regex_utils_1.RegexUtils.CEP_REGEX.test(cep)) {
            throw new Error(`Invalid cep! ${cep}, cep must have 8 digits`);
        }
        return cep;
    }
    static validateGeoLocation(lat, lng) {
        if (!lat || lat >= 90 || lat <= -90) {
            throw new Error(`Invalid value for latitude: ${lat}`);
        }
        if (!lng || lng >= 180 || lng <= -180) {
            throw new Error(`Invalid value for longitude: ${lng}`);
        }
    }
    static getAddressFromGeoLocation(lat, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateGeoLocation(lat, lng);
            return googleService.getAddressFromGeoLocation(lat, lng);
        });
    }
}
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CepUtils, "getAddressFrom", null);
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CepUtils, "getGeoLocation", null);
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], CepUtils, "validateCep", null);
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CepUtils, "validateGeoLocation", null);
__decorate([
    logger_1.log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CepUtils, "getAddressFromGeoLocation", null);
exports.CepUtils = CepUtils;
