"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCode = void 0;
const http_status_codes_1 = require("http-status-codes");
const HttpStatusCode = Object.assign(Object.assign({}, http_status_codes_1.StatusCodes), { getStatusText: http_status_codes_1.getReasonPhrase });
exports.HttpStatusCode = HttpStatusCode;
