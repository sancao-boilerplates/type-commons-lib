"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreConditionError = void 0;
var HttpStatus = require("http-status-codes");
var http_generic_error_1 = require("./http-generic-error");
var PreConditionError = /** @class */ (function (_super) {
    __extends(PreConditionError, _super);
    function PreConditionError(message, data, stack) {
        return _super.call(this, HttpStatus.PRECONDITION_FAILED, message, data, stack) || this;
    }
    return PreConditionError;
}(http_generic_error_1.HttpGenericError));
exports.PreConditionError = PreConditionError;
