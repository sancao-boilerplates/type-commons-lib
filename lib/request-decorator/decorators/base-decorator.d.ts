export declare abstract class BaseDecorator {
    private static defaultHandleError;
    private static defaultHandleSuccess;
    protected static applyOriginal(source: any, originalFunction: any, args: Array<unknown>, successHandle?: Function, errorHandle?: Function): any;
    protected static handleAsyncFunction(result: any, successHandle?: Function, errorHandle?: Function): Promise<unknown>;
    protected static generateKey(target: Object, propertyKey: string | symbol): string;
}
