declare class CallerModule {
    name: string;
    root: string;
    callSite: any;
    /**
     * Initializes a new instance of the CallerModule class.
     *
     * @param callSite
     * The CallSite of the caller.
     */
    constructor(callSite: any);
    /**
     * The path of the caller file.
     */
    get path(): string;
    /**
     * Gets a string that represents the object.
     */
    toString(): string;
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
declare function GetCallerModule(method: any, level?: any): CallerModule;
export { GetCallerModule };
