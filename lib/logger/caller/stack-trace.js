"use strict";
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
Object.defineProperty(exports, "__esModule", { value: true });
exports.callsites = void 0;
const limit = Error.stackTraceLimit;
const trace = Error.prepareStackTrace;
function callsites(frames, origin) {
    origin = origin || frames;
    frames = Math.abs(Math.floor(frames)) || 1;
    origin = typeof origin === 'function' && origin;
    Error.stackTraceLimit = origin ? frames : frames + 1;
    Error.prepareStackTrace = function (_, stack) { return stack; };
    const error = new Error();
    Error.captureStackTrace(error, origin || callsites);
    const stack = origin ? error.stack : error.stack.slice(1);
    Error.stackTraceLimit = limit;
    Error.prepareStackTrace = trace;
    return stack;
}
exports.callsites = callsites;
