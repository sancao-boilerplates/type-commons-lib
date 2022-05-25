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
exports.CepUtils = void 0;
var google_service_1 = require("./google-service");
var logger_1 = require("../../logger");
var regex_utils_1 = require("../regex-utils");
var correios_serivce_1 = require("./correios-serivce");
var constants_1 = require("../../constants");
var correiosService = new correios_serivce_1.CorreiosService();
var googleService = new google_service_1.GoogleService();
var CepUtils = /** @class */ (function () {
    function CepUtils() {
    }
    CepUtils.getAddressFrom = function (cep) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        cep = CepUtils.validateCep(cep);
                        return [4 /*yield*/, correiosService.getFromCorreios(cep)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, CepUtils.loadGeoLocation(result)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        err_1 = _a.sent();
                        logger_1.Logger.error('Error whule getting address from cep', err_1);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CepUtils.loadGeoLocation = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var googleResponse, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!address || !constants_1.AppConstants.GOOGLE_API_KEY) {
                            return [2 /*return*/, address];
                        }
                        return [4 /*yield*/, CepUtils.getGeoLocation(address.cep)];
                    case 1:
                        googleResponse = _a.sent();
                        if (!(!googleResponse || googleResponse.results.length === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, CepUtils.getGeoLocation("".concat(address.neighborhood).concat(address.state))];
                    case 2:
                        googleResponse = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (googleResponse && googleResponse.results.length > 0) {
                            address.geoLocation = {
                                latitude: googleResponse.results[0].geometry.location.lat,
                                longitude: googleResponse.results[0].geometry.location.lng,
                                googleResponse: googleResponse,
                            };
                        }
                        return [2 /*return*/, address];
                    case 4:
                        err_2 = _a.sent();
                        logger_1.Logger.error(err_2);
                        return [2 /*return*/, address];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CepUtils.getGeoLocation = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var googleResponse, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, googleService.getAddressFromGoogle(address)];
                    case 1:
                        googleResponse = _a.sent();
                        return [2 /*return*/, googleResponse];
                    case 2:
                        err_3 = _a.sent();
                        logger_1.Logger.error(err_3);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CepUtils.validateCep = function (cep) {
        if (!cep) {
            throw new Error("Invalid cep! ".concat(cep, ", cep must have 8 digits"));
        }
        cep = cep.replace(/-/g, '');
        if (!regex_utils_1.RegexUtils.CEP_REGEX.test(cep)) {
            throw new Error("Invalid cep! ".concat(cep, ", cep must have 8 digits"));
        }
        return cep;
    };
    CepUtils.validateGeoLocation = function (lat, lng) {
        if (!lat || lat >= 90 || lat <= -90) {
            throw new Error("Invalid value for latitude: ".concat(lat));
        }
        if (!lng || lng >= 180 || lng <= -180) {
            throw new Error("Invalid value for longitude: ".concat(lng));
        }
    };
    CepUtils.getAddressFromGeoLocation = function (lat, lng) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.validateGeoLocation(lat, lng);
                return [2 /*return*/, googleService.getAddressFromGeoLocation(lat, lng)];
            });
        });
    };
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
    return CepUtils;
}());
exports.CepUtils = CepUtils;
