export interface AwsContext {
    awsRequestId: string;
    callbackWaitsForEmptyEventLoop: boolean;
    clientContext: unknown;
    functionName: string;
    functionVersion: string;
    invokedFunctionArn: string;
    logGroupName: string;
    logStreamName: string;
    memoryLimitInMB: string;
}
