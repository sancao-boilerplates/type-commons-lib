import { SqsSendMessageOptions } from './send-message-options';
import { SqsConfigOptions } from './sqs-config-options';
import { SqsMessageReceiveOptions } from './sqs-receive-message-options';
export declare class SqsClient {
    private static isInitialized;
    private static sqs;
    static init(options?: SqsConfigOptions): void;
    private static validateSqsInitialized;
    static sendMessage(queueUrl: string, body: object | string, options?: SqsSendMessageOptions): Promise<string>;
    static receiveMessage<T>(queueUrl: string, options?: SqsMessageReceiveOptions): Promise<Array<T> | T>;
}
