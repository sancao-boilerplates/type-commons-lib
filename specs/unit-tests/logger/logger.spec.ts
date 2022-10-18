/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const silent = process.env.SILENT;
process.env.SILENT = 'false';
import { LoggerBuilder } from '../../../src/logger/builder/logger-builder';

import { LoggerTestHelper } from './logger-test-helper';
import { Logger, LoggerContext } from '../../../src/logger/log';
import { LoggerConstants } from '../../../src/constants';
import { StorageContext } from '../../../src/cls';

const loggerHelper = new LoggerTestHelper();

describe('Logger Suite Test', () => {
    const old = LoggerBuilder['defaultCustom'];

    const loggerSpy = jest.fn().mockImplementation((info: { [key: string]: any }, opts: any) => {
        return old(info, opts);
    });

    afterAll(() => {
        process.env.SILENT = silent;
    });

    beforeEach(() => {
        jest.clearAllMocks();
        LoggerBuilder['defaultCustom'] = loggerSpy;
    });

    it('receive Logger instance', () => {
        expect(() => {
            Logger.setInstance(Logger);
        }).not.toThrow();
    });
    describe('log', () => {
        it('Should hide default fields name on log', () => {
            Logger.debug({ password: '123', senha: '1233', cpf: '0293' });
            expect(loggerSpy.mock.results[0].value.password).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[0].value.senha).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[0].value.cpf).toBe(LoggerConstants.HidenLogFieldLabel);
            Logger.info({ password: '123', senha: '1233', cpf: '0293' });
            expect(loggerSpy.mock.results[1].value.password).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[1].value.senha).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[1].value.cpf).toBe(LoggerConstants.HidenLogFieldLabel);
            Logger.error({ password: '123', senha: '1233', cpf: '0293' });
            expect(loggerSpy.mock.results[2].value.password).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[2].value.senha).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[2].value.cpf).toBe(LoggerConstants.HidenLogFieldLabel);
            Logger.warn({ password: '123', senha: '1233', cpf: '0293' });
            expect(loggerSpy.mock.results[3].value.password).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[3].value.senha).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[3].value.cpf).toBe(LoggerConstants.HidenLogFieldLabel);
        });
        it('Should hide added custom fields name on log', () => {
            LoggerContext.addLoggerHidenField(['test']);
            const obj = { password: '123', senha: '1233', cpf: '0293', test: 'dfsad' };
            Logger.debug(obj);
            expect(loggerSpy.mock.results[0].value.password).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[0].value.senha).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[0].value.cpf).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[0].value.test).toBe(LoggerConstants.HidenLogFieldLabel);
            Logger.info(obj);
            expect(loggerSpy.mock.results[1].value.password).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[1].value.senha).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[1].value.cpf).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[1].value.test).toBe(LoggerConstants.HidenLogFieldLabel);
            Logger.error(obj);
            expect(loggerSpy.mock.results[2].value.password).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[2].value.senha).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[2].value.cpf).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[2].value.test).toBe(LoggerConstants.HidenLogFieldLabel);
            Logger.warn(obj);
            expect(loggerSpy.mock.results[3].value.password).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[3].value.senha).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[3].value.cpf).toBe(LoggerConstants.HidenLogFieldLabel);
            expect(loggerSpy.mock.results[3].value.test).toBe(LoggerConstants.HidenLogFieldLabel);
        });
        it('Should hide all customs fields name on log', () => {
            LoggerContext.setLoggerHidenField(['test']);
            const obj = { password: '123', senha: '1233', cpf: '0293', test: 'dfsad' };
            Logger.debug(obj);
            expect(loggerSpy.mock.results[0].value.password).toBe(obj.password);
            expect(loggerSpy.mock.results[0].value.senha).toBe(obj.senha);
            expect(loggerSpy.mock.results[0].value.cpf).toBe(obj.cpf);
            expect(loggerSpy.mock.results[0].value.test).toBe(LoggerConstants.HidenLogFieldLabel);
            Logger.info(obj);
            expect(loggerSpy.mock.results[1].value.password).toBe(obj.password);
            expect(loggerSpy.mock.results[1].value.senha).toBe(obj.senha);
            expect(loggerSpy.mock.results[1].value.cpf).toBe(obj.cpf);
            expect(loggerSpy.mock.results[1].value.test).toBe(LoggerConstants.HidenLogFieldLabel);
            Logger.error(obj);
            expect(loggerSpy.mock.results[2].value.password).toBe(obj.password);
            expect(loggerSpy.mock.results[2].value.senha).toBe(obj.senha);
            expect(loggerSpy.mock.results[2].value.cpf).toBe(obj.cpf);
            expect(loggerSpy.mock.results[2].value.test).toBe(LoggerConstants.HidenLogFieldLabel);
            Logger.warn(obj);
            expect(loggerSpy.mock.results[3].value.password).toBe(obj.password);
            expect(loggerSpy.mock.results[3].value.senha).toBe(obj.senha);
            expect(loggerSpy.mock.results[3].value.cpf).toBe(obj.cpf);
            expect(loggerSpy.mock.results[3].value.test).toBe(LoggerConstants.HidenLogFieldLabel);
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
    });
    describe('CorrelationId', () => {
        it('Should keep correlationId among concurrency async calls', (done) => {
            try {
                StorageContext.run(() => {
                    loggerHelper.chainCall1('1', 50).then((result) => {
                        expect(result).toEqual('1');
                        done();
                    });
                });
                StorageContext.run(() => {
                    loggerHelper.chainCall1('2', 10).then((result) => {
                        expect(result).toEqual('2');
                    });
                });
            } catch (err) {
                done(err);
            }
        });

        it('Logger should respect the correlationId chain', (done) => {
            try {
                StorageContext.run(() => {
                    loggerHelper.chainCall1('1', 50).then((result) => {
                        expect(result).toEqual('1');
                        done();
                    });
                });
                StorageContext.run(() => {
                    loggerHelper.chainCall1('2', 10).then((result) => {
                        expect(result).toEqual('2');
                    });
                });
            } catch (err) {
                done(err);
            }
        });
    });

    describe('Decorator', () => {
        it('test log async decorator ', async () => {
            loggerHelper.testLogDecorator();
            const result = await loggerHelper.testAsyncLogDecorator();
            Logger.debug(result);
        });

        it('test log throw async decorator ', async () => {
            try {
                await loggerHelper.testAsyncThrowLogDecorator();
            } catch (err) {}
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
