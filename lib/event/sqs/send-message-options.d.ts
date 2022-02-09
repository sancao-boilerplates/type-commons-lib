import { SQS } from 'aws-sdk';
export interface SqsSendMessageOptions {
    messageAttributes?: SQS.Types.MessageBodyAttributeMap;
    /**
     * @default 0
     */
    delaySeconds?: number;
}
