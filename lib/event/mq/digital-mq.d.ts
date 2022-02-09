import { Message, MQ, RabbitConnectionData } from './events-types';
export declare class DigitalMQ implements MQ {
    private conn;
    private connData;
    /**
     * Creates an instance of digital mq.
     * @param connectionData {ConnectionData}
     */
    private constructor();
    /**
     * Inits digital mq
     * @param connectionData {ConnectionData}
     * @returns init
     */
    static init(connectionData: RabbitConnectionData): MQ;
    private getConnection;
    private connectionError;
    private connectionClose;
    private getChannel;
    private channelClosed;
    private channeError;
    /**
     *
     * @param queue an string that represents the desired queue to listener
     * @param callback the desired function wich will process a new received message
     * @param errorCallback an optionl function that will be called in case some erro while receiving a message
     */
    listenForEvents(queue: string, callback: (message: Message | string) => void, errorCallback?: (...args: unknown[]) => void): Promise<void>;
    private channelConsume;
    private static parseContent;
    private publishMessage;
    sendMessage(queue: string, message: Message): Promise<string>;
    close(): Promise<void>;
}
