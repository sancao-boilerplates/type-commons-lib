/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
import { LoggerBuilder } from '../../../src/logger/builder/logger-builder';
const old = LoggerBuilder['defaultCustom'];
const loggerSpy = jest.fn().mockImplementation((info: { [key: string]: any }, opts: any) => {
    console.log('sdf');
    return old(info, opts);
});
LoggerBuilder['defaultCustom'] = loggerSpy;

import { LoggerTestHelper } from './logger-test-helper';
import { Logger } from '../../../src/logger/log';

const loggerHelper = new LoggerTestHelper();

describe('Logger Suite Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('receive Logger instance', () => {
        expect(() => {
            Logger.setInstance(Logger);
        }).not.toThrow();
    });

    it('allow log null and undefined', () => {
        expect(() => {
            Logger.debug('test', null);
        }).not.toThrow();
        expect(() => {
            Logger.debug('test', undefined);
        }).not.toThrow();
        expect(() => {
            Logger.info('test', null);
        }).not.toThrow();
        expect(() => {
            Logger.info('test', undefined);
        }).not.toThrow();
        expect(() => {
            Logger.error('test', null);
        }).not.toThrow();
        expect(() => {
            Logger.error('test', undefined);
        }).not.toThrow();
        expect(() => {
            Logger.warn('test', null);
        }).not.toThrow();
        expect(() => {
            Logger.warn('test', undefined);
        }).not.toThrow();

        expect(() => {
            Logger.debug(null);
        }).not.toThrow();
        expect(() => {
            Logger.debug(undefined);
        }).not.toThrow();
        expect(() => {
            Logger.info(null);
        }).not.toThrow();
        expect(() => {
            Logger.info(undefined);
        }).not.toThrow();
        expect(() => {
            Logger.error(null);
        }).not.toThrow();
        expect(() => {
            Logger.error(undefined);
        }).not.toThrow();
        expect(() => {
            Logger.warn(null);
        }).not.toThrow();
        expect(() => {
            Logger.warn(undefined);
        }).not.toThrow();
    });
    
    describe('CorrelationId', () => {
        it('Should keep correlationId among concurrency async calls', (done) => {
            try {
                loggerHelper.chainCall1('1', 50).then((result) => {
                    expect(result).toEqual('1');
                    done();
                });

                loggerHelper.chainCall1('2', 10).then((result) => {
                    expect(result).toEqual('2');
                });
            } catch (err) {
                done(err);
            }
        });

        it('Logger should respect the correlationId chain', (done) => {
            try {
                Logger.debug();
                loggerHelper.chainCall1('1', 50).then((result) => {
                    expect(result).toEqual('1');
                    done();
                });

                loggerHelper.chainCall1('2', 10).then((result) => {
                    expect(result).toEqual('2');
                });
            } catch (err) {
                done(err);
            }
        });
    });

    describe('Decorator', () => {
        it('test log async decorator ', async (done) => {
            loggerHelper.testLogDecorator();
            const result = await loggerHelper.testAsyncLogDecorator();
            Logger.debug(result);
            done();
        });

        it('test log throw async decorator ', async (done) => {
            try {
                await loggerHelper.testAsyncThrowLogDecorator();
            } catch (err) {
                done();
            }
        });

        it('test log throw decorator ', () => {
            try {
                loggerHelper.testLogThrowDecorator();
            } catch (err) {}
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });
});
