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
exports.InternalServerError = void 0;
var HttpStatus = require("http-status-codes");
var http_generic_error_1 = require("./http-generic-error");
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message, data, stack) {
        return _super.call(this, HttpStatus.INTERNAL_SERVER_ERROR, message, data, stack) || this;
    }
    return InternalServerError;
}(http_generic_error_1.HttpGenericError));
exports.InternalServerError = InternalServerError;
