"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpGenericError = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var exception_names_1 = require("./exception-names");
var HttpGenericError = /** @class */ (function (_super) {
    __extends(HttpGenericError, _super);
    function HttpGenericError(statusCode, message, data, stack) {
        var _this = _super.call(this, message) || this;
        _this.name = exception_names_1.ExceptionName(statusCode);
        _this.statusCode = statusCode;
        _this.status = statusCode;
        _this.message = message;
        _this.response = data && typeof data === 'object' ? data.response : null;
        _this.data = data;
        _this.stack = stack || _this.stack;
        return _this;
    }
    return HttpGenericError;
}(Error));
exports.HttpGenericError = HttpGenericError;
