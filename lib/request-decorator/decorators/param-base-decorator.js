"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseParamDecorator = void 0;
const request_decorator_helper_1 = require("../request-decorator-helper");
const base_decorator_1 = require("./base-decorator");
class BaseParamDecorator extends base_decorator_1.BaseDecorator {
    static setParamMetadata(target, propertyKey, index, paramOptions, type, paramName) {
        const key = BaseParamDecorator.generateKey(target, propertyKey);
        let definition = request_decorator_helper_1.RequestStorage.storage.get(key);
        paramOptions = paramOptions || {};
        const inputArgument = Object.assign(Object.assign({}, paramOptions), { index,
            type,
            paramName });
        if (!definition) {
            definition = {
                method: propertyKey,
                target,
                arguments: new Set(),
            };
        }
        if (!definition.arguments.has(inputArgument)) {
            definition.arguments.add(inputArgument);
            request_decorator_helper_1.RequestStorage.storage.set(key, definition);
        }
    }
}
exports.BaseParamDecorator = BaseParamDecorator;
