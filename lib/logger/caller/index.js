"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCallerModule = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
var FileSystem = require("fs");
var Path = require("path");
var util = require("util");
var StackTrace = require("./stack-trace");
var CallerModule = /** @class */ (function () {
    /**
     * Initializes a new instance of the CallerModule class.
     *
     * @param callSite
     * The CallSite of the caller.
     */
    function CallerModule(callSite) {
        /**
         * The name of the module.
         */
        this.name = '';
        /**
         * The path of the root of the module.
         */
        this.root = '';
        this.callSite = callSite;
    }
    Object.defineProperty(CallerModule.prototype, "path", {
        /**
         * The path of the caller file.
         */
        get: function () {
            return this.callSite.getFileName();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets a string that represents the object.
     */
    CallerModule.prototype.toString = function () {
        return this.path + ":" + this.callSite.getLineNumber() + ":" + this.callSite.getColumnNumber();
    };
    return CallerModule;
}());
/**
 * Gets the module that called a specified method at a specified stacktrace-level.
 *
 * @param method
 * The method whose caller is to be determined.
 *
 * @param level
 * The stacktrace-level whose caller is to be determined.
 */
function GetCallerModule(method, level) {
    var origin;
    var frames;
    if (typeof method === 'number') {
        origin = GetCallerModule;
        frames = method;
    }
    else if (!util.isNullOrUndefined(method)) {
        origin = method;
        frames = level;
    }
    var stack = StackTrace.callsites(frames, origin);
    var result = new CallerModule(stack[stack.length - 1]);
    /* if the caller isn't a module */
    if (result.path === Path.basename(result.path)) {
        result.name = result.path;
        result.root = result.callSite.isNative() ? 'V8' : 'node';
    }
    else {
        /* if the caller is the topmost module */
        if (result.path.split(Path.sep).indexOf('node_modules') < 0) {
            var root = Path.dirname(result.path);
            var oldRoot = null;
            var isModuleRoot = function (fileName) {
                var files = FileSystem.readdirSync(fileName).filter(function (value) { return !FileSystem.lstatSync(Path.join(fileName, value)).isDirectory(); });
                return files.indexOf('package.json') > 0;
            };
            while (!isModuleRoot(root) && root !== oldRoot) {
                oldRoot = root;
                root = Path.resolve(root, '..');
            }
            result.root = root;
        }
        else {
            /* if the caller is a submodule */
            var pathTree = result.path.split(Path.sep);
            var moduleFolderIndex = pathTree.indexOf('node_modules') + 1;
            result.root = pathTree.slice(0, moduleFolderIndex + 1).join(Path.sep);
        }
        result.name = require(Path.join(result.root, 'package.json')).name;
    }
    return result;
}
exports.GetCallerModule = GetCallerModule;
