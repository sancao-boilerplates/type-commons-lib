"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = void 0;
const typedi_1 = require("typedi");
class DependencyInjector {
    setCustomInjector(injector) {
        this.custom = injector;
    }
    get(type) {
        if (this.custom) {
            return this.custom.get(type);
        }
        return typedi_1.default.get(type);
    }
    set(token, value) {
        if (this.custom) {
            return this.custom.set(token, value);
        }
        typedi_1.default.set(token, value);
    }
}
const Injector = new DependencyInjector();
exports.Injector = Injector;
