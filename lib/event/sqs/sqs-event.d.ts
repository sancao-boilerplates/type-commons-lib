export interface SqsContext {
    callbackWaitsForEmptyEventLoop: boolean;
    functionVersion: string;
    functionName: string;
    memoryLimitInMB: string;
    logGroupName: string;
    logStreamName: string;
    invokedFunctionArn: string;
    awsRequestId: string;
}
export interface SqsEventItem {
    messageId: string;
    receiptHandle: string;
    attributes: {
        [key: string]: unknown;
    };
    messageAttributes: {
        [key: string]: unknown;
    };
    body: string;
    md5OfBody: string;
    eventSource: string;
    eventSourceARN: string;
    awsRegion: string;
}
export interface SqsEvent {
    Records: Array<SqsEventItem>;
}
