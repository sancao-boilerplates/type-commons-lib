export declare class ControllerHelper {
    getTest(): Promise<string>;
    testHeader(token: string): Promise<string>;
    testHeaderValidateSchema1(token: string): Promise<string>;
    testHeaderAllParams(token: unknown): Promise<unknown>;
    testHeaderAllowAitional(token: unknown): Promise<unknown>;
    testParam(token: string): Promise<string>;
    testParamValidateSchema1(token: string): Promise<string>;
    testParamAllParams(token: unknown): Promise<unknown>;
    testParamAllowAitional(token: unknown): Promise<unknown>;
    testQuery(token: string): Promise<string>;
    testQueryValidateSchema1(token: string): Promise<string>;
    testQueryAllParams(token: unknown): Promise<unknown>;
    testQueryAllowAitional(token: unknown): Promise<unknown>;
    testAuth(): Promise<string>;
    testAuthRole(): Promise<string>;
}
