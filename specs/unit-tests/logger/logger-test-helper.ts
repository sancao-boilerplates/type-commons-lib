import { LoggerBuilder } from './../../../src/logger/builder/logger-builder';
// import * as winston from 'winston';
// const logger = winston.createLogger({
//     transports: [new winston.transports.Console()],
// });
// const olddebug = logger.debug;
// const oldInfo = logger.info;
// const oldError = logger.error;
// const oldWarn = logger.warn;

// logger.debug = jest.fn().mockImplementation(olddebug);
// logger.error = jest.fn().mockImplementation(oldError);
// logger.info = jest.fn().mockImplementation(oldInfo);
// logger.warn = jest.fn().mockImplementation(oldWarn);

// jest.spyOn(winston, 'createLogger').mockReturnValue(logger);

import { LoggerContext, Logger } from '../../../src/logger/log';

export class LoggerTestHelper {
    public async chainCall1(id: string, ms: number) {
        return new Promise(async (resolve) => {
            setTimeout(async () => {
                LoggerContext.setCorrelationId(id);
                await this.call1(id);
                await this.call2(id);
                const correlationId = LoggerContext.getCorrelationId();
                return resolve(correlationId);
            }, ms);
        });
    }

    public async call1(id: string) {
        await new Promise((resolve) => {
            setTimeout(() => {
                Logger.debug(`Call 1 - ${id}`);
                return resolve();
            }, 1000);
        });
    }

    public async call2(id: string) {
        await new Promise((resolve) => {
            setTimeout(() => {
                Logger.debug(`Call 2 - ${id}`);
                return resolve();
            }, 5);
        });
    }

    public testLogDecorator() {
        Logger.debug('Log Decorator 1');
    }

    public testLogThrowDecorator() {
        Logger.debug('Log Decorator 1');
        throw new Error('error not async function ');
    }

    public async testAsyncLogDecorator() {
        await this.call1('1');
        return 'TEST';
    }

    public async testAsyncThrowLogDecorator() {
        await this.call1('1');
        throw new Error('ERROR TEST');
    }
}
