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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ControllerHelper = void 0;
const Joi = require("joi");
const __1 = require("..");
let ControllerHelper = class ControllerHelper {
    getTest() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve('OK'));
        });
    }
    //HEAD
    testHeader(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    testHeaderValidateSchema1(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    testHeaderAllParams(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    testHeaderAllowAitional(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    //Param
    testParam(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    testParamValidateSchema1(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    testParamAllParams(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    testParamAllowAitional(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    //QUERY
    testQuery(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    testQueryValidateSchema1(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    testQueryAllParams(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    testQueryAllowAitional(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve(token));
        });
    }
    testAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve('ok'));
        });
    }
    testAuthRole() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve('ok'));
        });
    }
};
__decorate([
    (0, __1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "getTest", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Header)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testHeader", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Header)('token', { validateSchema: Joi.object({ token: Joi.string() }) })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testHeaderValidateSchema1", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Header)({ validateSchema: Joi.object({ token: Joi.string() }) })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testHeaderAllParams", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Header)({ validateSchema: Joi.object({ token: Joi.string() }), allowAditionalProperties: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testHeaderAllowAitional", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testParam", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Param)('token', { validateSchema: Joi.object({ token: Joi.string() }) })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testParamValidateSchema1", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Param)({ validateSchema: Joi.object({ token: Joi.string() }) })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testParamAllParams", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Param)({ validateSchema: Joi.object({ token: Joi.string() }), allowAditionalProperties: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testParamAllowAitional", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testQuery", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Query)('token', { validateSchema: Joi.object({ token: Joi.string() }) })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testQueryValidateSchema1", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Query)({ validateSchema: Joi.object({ token: Joi.string() }) })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testQueryAllParams", null);
__decorate([
    (0, __1.Get)(),
    __param(0, (0, __1.Query)({ validateSchema: Joi.object({ token: Joi.string() }), allowAditionalProperties: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testQueryAllowAitional", null);
__decorate([
    (0, __1.Auth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testAuth", null);
__decorate([
    (0, __1.Auth)({ role: 3 }),
    (0, __1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerHelper.prototype, "testAuthRole", null);
ControllerHelper = __decorate([
    (0, __1.Injectable)()
], ControllerHelper);
exports.ControllerHelper = ControllerHelper;
