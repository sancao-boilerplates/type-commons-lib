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
exports.GenericCrudController = void 0;
const node_http_serverless_1 = require("node-http-serverless");
const node_smart_log_1 = require("node-smart-log");
const schemas_1 = require("./schemas");
class GenericCrudController {
    constructor(logic) {
        this.logic = logic;
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.logic.create(body);
            }
            catch (error) {
                node_smart_log_1.Logger.error(error);
                throw error;
            }
        });
    }
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.logic.getAll(query);
                return result;
            }
            catch (error) {
                node_smart_log_1.Logger.error(error);
                throw error;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.logic.getById(id);
                return result;
            }
            catch (error) {
                node_smart_log_1.Logger.error(error);
                throw error;
            }
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.logic.update(id, body);
                return result;
            }
            catch (error) {
                node_smart_log_1.Logger.error(error);
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.logic.deleteById(id);
            }
            catch (error) {
                node_smart_log_1.Logger.error(error);
                throw error;
            }
        });
    }
}
__decorate([
    (0, node_http_serverless_1.Post)(),
    (0, node_smart_log_1.log)(),
    __param(0, (0, node_http_serverless_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GenericCrudController.prototype, "create", null);
__decorate([
    (0, node_http_serverless_1.Get)(),
    (0, node_smart_log_1.log)(),
    __param(0, (0, node_http_serverless_1.Query)({ validateSchema: schemas_1.PaginationSchema, allowAditionalProperties: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GenericCrudController.prototype, "getAll", null);
__decorate([
    (0, node_http_serverless_1.Get)(),
    (0, node_smart_log_1.log)(),
    __param(0, (0, node_http_serverless_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenericCrudController.prototype, "getById", null);
__decorate([
    (0, node_http_serverless_1.Patch)(),
    (0, node_smart_log_1.log)(),
    __param(0, (0, node_http_serverless_1.Param)('id')),
    __param(1, (0, node_http_serverless_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GenericCrudController.prototype, "update", null);
__decorate([
    (0, node_http_serverless_1.Delete)(),
    __param(0, (0, node_http_serverless_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenericCrudController.prototype, "delete", null);
exports.GenericCrudController = GenericCrudController;
