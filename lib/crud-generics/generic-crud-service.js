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
exports.GenericCrudService = void 0;
const node_smart_log_1 = require("node-smart-log");
const service_1 = require("../service");
class GenericCrudService extends service_1.HttpService {
    constructor(resource, options) {
        super(options);
        this.resource = resource;
    }
    create(t) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post(this.resource, t);
        });
    }
    getAll(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.getQuery(pagination);
            const url = `${this.resource}${query}`;
            return this.get(url);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.resource}/${id}`;
            return this.get(url);
        });
    }
    update(id, toUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.resource}/${id}`;
            return this.patch(url, toUpdate);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.resource}/${id}`;
            return this.delete(url);
        });
    }
    getQuery(pagination) {
        let query = '';
        if (!pagination)
            return query;
        pagination = pagination.filter ? pagination.filter : pagination;
        if (pagination.skip) {
            query = `?skip=${pagination.skip}`;
        }
        if (pagination.offSet) {
            query = query ? `&offSet=${pagination.offSet}` : `?offSet=${pagination.offSet}`;
        }
        Object.keys(pagination).forEach((k) => {
            if (k == 'total' || k == 'skip' || k == 'offSet' || k == 'data')
                return;
            if (!query) {
                query = `?${k}=${pagination[k]}`;
            }
            else {
                query = `${query}&${k}=${pagination[k]}`;
            }
        });
        node_smart_log_1.Logger.debug('get by query', { query });
        return query;
    }
}
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GenericCrudService.prototype, "create", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GenericCrudService.prototype, "getAll", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenericCrudService.prototype, "getById", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GenericCrudService.prototype, "update", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenericCrudService.prototype, "deleteById", null);
__decorate([
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], GenericCrudService.prototype, "getQuery", null);
exports.GenericCrudService = GenericCrudService;
