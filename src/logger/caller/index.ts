/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import * as FileSystem from 'fs';
import * as Path from 'path';
import * as util from 'util';
import * as StackTrace from './stack-trace';

class CallerModule {
    public name: string;

    public root: string;

    public callSite;

    /**
     * Initializes a new instance of the CallerModule class.
     *
     * @param callSite
     * The CallSite of the caller.
     */
    constructor(callSite) {
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

    /**
     * The path of the caller file.
     */
    get path(): string {
        return this.callSite.getFileName();
    }

    /**
     * Gets a string that represents the object.
     */
    toString(): string {
        return `${this.path}:${this.callSite.getLineNumber()}:${this.callSite.getColumnNumber()}`;
    }
}

/**
 * Gets the module that called a specified method at a specified stacktrace-level.
 *
 * @param method
 * The method whose caller is to be determined.
 *
 * @param level
 * The stacktrace-level whose caller is to be determined.
 */
function GetCallerModule(method, level?) {
    let origin;
    let frames;

    if (typeof method === 'number') {
        origin = GetCallerModule;
        frames = method;
    } else if (!util.isNullOrUndefined(method)) {
        origin = method;
        frames = level;
    }
    const stack = StackTrace.callsites(frames, origin);
    const result = new CallerModule(stack[stack.length - 1]);
    /* if the caller isn't a module */
    if (result.path === Path.basename(result.path)) {
        result.name = result.path;
        result.root = result.callSite.isNative() ? 'V8' : 'node';
    } else {
        /* if the caller is the topmost module */
        if (result.path.split(Path.sep).indexOf('node_modules') < 0) {
            let root = Path.dirname(result.path);
            let oldRoot = null;
            const isModuleRoot = (fileName) => {
                const files = FileSystem.readdirSync(fileName).filter((value) => !FileSystem.lstatSync(Path.join(fileName, value)).isDirectory());
                return files.indexOf('package.json') > 0;
            };
            while (!isModuleRoot(root) && root !== oldRoot) {
                oldRoot = root;
                root = Path.resolve(root, '..');
            }
            result.root = root;
        } else {
            /* if the caller is a submodule */
            const pathTree = result.path.split(Path.sep);
            const moduleFolderIndex = pathTree.indexOf('node_modules') + 1;
            result.root = pathTree.slice(0, moduleFolderIndex + 1).join(Path.sep);
        }
        result.name = require(Path.join(result.root, 'package.json')).name;
    }
    return result;
}
export { GetCallerModule };
