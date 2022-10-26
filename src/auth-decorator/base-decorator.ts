/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export abstract class BaseDecorator {
    private static defaultHandleError(err: unknown): any {
        throw err;
    }

    private static defaultHandleSuccess(result: any): any {
        return result;
    }

    protected static applyOriginal(source: any, originalFunction: any, args: Array<unknown>, successHandle?: Function, errorHandle?: Function) {
        try {
            const result = originalFunction.apply(source, args);

            if (result instanceof Promise) {
                return BaseDecorator.handleAsyncFunction(result, successHandle, errorHandle);
            }

            return successHandle ? successHandle(result) : BaseDecorator.defaultHandleSuccess(result);
        } catch (err) {
            return errorHandle ? errorHandle(err) : BaseDecorator.defaultHandleError(err);
        }
    }

    protected static handleAsyncFunction(result: any, successHandle?: Function, errorHandle?: Function): Promise<unknown> {
        return new Promise((resolve) => {
            result
                .then((funcResult: any) => {
                    const resp = successHandle ? successHandle(funcResult) : BaseDecorator.defaultHandleSuccess(funcResult);
                    resolve(resp);
                })
                .catch((err: Error | undefined) => {
                    resolve(errorHandle ? errorHandle(err) : BaseDecorator.defaultHandleError(err));
                });
        });
    }

    protected static generateKey(target: Object, propertyKey: string | symbol): string {
        return `${target?.constructor?.name ?? 'default'}.${propertyKey as string}`;
    }
}
