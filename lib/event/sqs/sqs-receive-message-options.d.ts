export interface SqsMessageReceiveOptions {
    /**
     * Number of messages will receive
     * @default 1
     */
    maxNumberOfMessages: number;
    /**
     * if it checked as true will be applied JSON.parse for each message body otherwise a string body will be returned
     */
    isBodyObject: boolean;
}
