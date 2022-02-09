export interface Message {
    messageId?: string;
    retries?: number;
    attributes?: {
        [key: string]: any;
    };
    body: string;
}
/**
 * Connection data
 */
export interface RabbitConnectionData {
    /**
     * Protocal to connect
     * Default 'amqp'
     */
    protocol?: string;
    /**
     * Host address
     */
    host: string;
    /**
     * Connection PORT
     * Default 5672
     */
    port?: number;
    /**
     * username
     * Default 'guest'
     */
    user?: string;
    /**
     * password
     * Default 'guest'
     */
    password?: string;
    /**
     * Should retry reconnect automatically
     * Default 'true'
     */
    reconnect?: boolean;
}
export interface MQ {
    /**
     * Method allow to send a message to a queue
     * @param queue {QueueEvent | string}
     * @param message {string | object}
     * @returns messageId {string}
     */
    sendMessage(queue: string, message: string | object): Promise<string>;
    /**
     *
     * @param queue {QueueEvent} desired queue to listener
     * @param callback {(string)=>any} callback function will be called whenever a message is published on the required queue
     */
    listenForEvents(queue: string, callback: (message: Message | string) => void, errorCallback?: (...args: any[]) => void): void;
    close(): Promise<void>;
}
