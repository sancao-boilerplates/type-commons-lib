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
exports.GenericCrudLogc = void 0;
const node_smart_log_1 = require("node-smart-log");
const node_http_helper_1 = require("node-http-helper");
class GenericCrudLogc {
    constructor(service) {
        this.service = service;
    }
    create(t) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.create(t);
        });
    }
    getAll(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getAll(pagination);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const t = this.service.getById(id);
                if (!t)
                    throw new node_http_helper_1.NotFoundError(`Not found entity for id: ${id}`);
                return t;
            }
            catch (error) {
                node_smart_log_1.Logger.error(error);
                throw error;
            }
        });
    }
    update(id, toUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.update(id, toUpdate);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.deleteById(id);
        });
    }
}
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GenericCrudLogc.prototype, "create", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GenericCrudLogc.prototype, "getAll", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenericCrudLogc.prototype, "getById", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GenericCrudLogc.prototype, "update", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenericCrudLogc.prototype, "deleteById", null);
exports.GenericCrudLogc = GenericCrudLogc;
