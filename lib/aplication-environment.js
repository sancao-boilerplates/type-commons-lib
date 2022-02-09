"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AplicationEnvironment = void 0;
var environment_1 = require("./env/environment");
var AplicationEnvironment = /** @class */ (function () {
    function AplicationEnvironment() {
    }
    AplicationEnvironment.getEnvironment = function () {
        if (process.env.NODE_ENV === environment_1.Environment.DEVELOPMENT || process.env.NOTIFICATION_ENVIRONMENT === environment_1.Environment.DEVELOPMENT) {
            return environment_1.Environment.DEVELOPMENT;
        }
        if (process.env.NODE_ENV === environment_1.Environment.PRODUCTION || process.env.NOTIFICATION_ENVIRONMENT === environment_1.Environment.PRODUCTION) {
            return environment_1.Environment.PRODUCTION;
        }
        return environment_1.Environment.HOMOLOGATION;
    };
    return AplicationEnvironment;
}());
exports.AplicationEnvironment = AplicationEnvironment;
