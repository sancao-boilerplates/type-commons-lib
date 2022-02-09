import * as winston from 'winston';
import { LoggerBuilder } from '../../../src/logger/builder/logger-builder';
const oldEnv = process.env.SILENT;
process.env.SILENT = 'false';
const old = LoggerBuilder['defaultCustom'];
const loggerSpy = jest.fn().mockImplementation((info: { [key: string]: any }, opts: any) => {
    return old(info, opts);
});
LoggerBuilder['defaultCustom'] = loggerSpy;

import { Logger } from '../../../src/logger/log';

describe('Log methods', () => {
    afterAll(() => {
        LoggerBuilder['defaultCustom'] = old;
        process.env.SILENT = oldEnv;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });
    const extraArgs = {
        arg1: 'Arg1',
        arg2: 2,
        arg3: ['Arg3', 'Args3'],
        arg4: {
            args: 'args',
        },
    };

    const error = new Error('Error');

    describe('CreateLog', () => {
        const createSpy = jest.spyOn(winston, 'createLogger');

        it('Should create logger using debug level', () => {
            const logger = LoggerBuilder.getLogger();
            expect(createSpy).toBeCalled();
            const parameters = createSpy.mock.calls[0][0];
            expect(parameters.level).toBe('debug');
        });
        it('Should create logger using console Transportation', () => {
            const logger = LoggerBuilder.getLogger();
            expect(createSpy).toBeCalled();
            const parameters = createSpy.mock.calls[0][0];
            expect(parameters.transports).toBeDefined();
            expect(parameters.transports[0].name).toBe('console');
        });

        it('Should create logger using the provided log level', () => {
            process.env.LOG_LEVEL = 'info';
            let logger = LoggerBuilder.getLogger();
            expect(createSpy).toBeCalled();
            let parameters = createSpy.mock.calls[0][0];
            expect(parameters.level).toBe('info');

            process.env.LOG_LEVEL = 'error';
            logger = LoggerBuilder.getLogger();
            expect(createSpy).toBeCalled();
            parameters = createSpy.mock.calls[1][0];
            expect(parameters.level).toBe('error');

            process.env.LOG_LEVEL = 'warn';
            logger = LoggerBuilder.getLogger();
            expect(createSpy).toBeCalled();
            parameters = createSpy.mock.calls[2][0];
            expect(parameters.level).toBe('warn');

            process.env.LOG_LEVEL = 'debug';
            logger = LoggerBuilder.getLogger();
            expect(createSpy).toBeCalled();
            parameters = createSpy.mock.calls[3][0];
            expect(parameters.level).toBe('debug');
        });

        it('Should create logger using the provided log level even if it is uppercase', () => {
            process.env.LOG_LEVEL = 'INFO';
            let logger = LoggerBuilder.getLogger();
            expect(createSpy).toBeCalled();
            let parameters = createSpy.mock.calls[0][0];
            expect(parameters.level).toBe('info');

            process.env.LOG_LEVEL = 'ERROR';
            logger = LoggerBuilder.getLogger();
            expect(createSpy).toBeCalled();
            parameters = createSpy.mock.calls[1][0];
            expect(parameters.level).toBe('error');

            process.env.LOG_LEVEL = 'WARN';
            logger = LoggerBuilder.getLogger();
            expect(createSpy).toBeCalled();
            parameters = createSpy.mock.calls[2][0];
            expect(parameters.level).toBe('warn');

            process.env.LOG_LEVEL = 'DEBUG';
            logger = LoggerBuilder.getLogger();
            expect(createSpy).toBeCalled();
            parameters = createSpy.mock.calls[3][0];
            expect(parameters.level).toBe('debug');
        });
    });
    describe('Log Parameters', () => {
        const message = 'someMessage';
        describe('DEBUG', () => {
            it('Expected keep the log message', () => {
                Logger.debug(message);
                expect(loggerSpy.mock.results[0].value.message).toBe(message);
            });
            it('Expected log object to contains extra arguments', () => {
                Logger.debug('Teste', extraArgs);
                expect(loggerSpy.mock.results[0].value.arg1).toBe(extraArgs.arg1);
                expect(loggerSpy.mock.results[0].value.arg2).toBe(extraArgs.arg2);
                expect(loggerSpy.mock.results[0].value.arg3).toBe(extraArgs.arg3);
                expect(loggerSpy.mock.results[0].value.arg4).toBe(extraArgs.arg4);
            });

            it('Expected log object to contains error parameter', () => {
                Logger.debug('Teste', error);

                expect(loggerSpy.mock.results[0].value.errorMessage).toBeDefined();
                expect(loggerSpy.mock.results[0].value.errorMessage).toBe(error.message);
                expect(loggerSpy.mock.results[0].value.stackError).toBeDefined();
            });

            it('Expected log object to contains multiple parameter', () => {
                Logger.debug('Teste', extraArgs, error);

                expect(loggerSpy.mock.results[0].value.errorMessage).toBeDefined();
                expect(loggerSpy.mock.results[0].value.errorMessage).toBe(error.message);
                expect(loggerSpy.mock.results[0].value.stackError).toBeDefined();
                expect(loggerSpy.mock.results[0].value.arg1).toBe(extraArgs.arg1);
            });
        });
        describe('INFO', () => {
            it('Expected keep the log message', () => {
                Logger.info(message);
                expect(loggerSpy.mock.results[0].value.message).toBe(message);
            });
            it('Expected log object to contains extra arguments', () => {
                Logger.info('Teste', extraArgs);
                expect(loggerSpy.mock.results[0].value.arg1).toBe(extraArgs.arg1);
                expect(loggerSpy.mock.results[0].value.arg2).toBe(extraArgs.arg2);
                expect(loggerSpy.mock.results[0].value.arg3).toBe(extraArgs.arg3);
                expect(loggerSpy.mock.results[0].value.arg4).toBe(extraArgs.arg4);
            });

            it('Expected log object to contains error parameter', () => {
                Logger.info('Teste', error);

                expect(loggerSpy.mock.results[0].value.errorMessage).toBeDefined();
                expect(loggerSpy.mock.results[0].value.errorMessage).toBe(error.message);
                expect(loggerSpy.mock.results[0].value.stackError).toBeDefined();
            });

            it('Expected log object to contains multiple parameter', () => {
                Logger.info('Teste', extraArgs, error);

                expect(loggerSpy.mock.results[0].value.errorMessage).toBeDefined();
                expect(loggerSpy.mock.results[0].value.errorMessage).toBe(error.message);
                expect(loggerSpy.mock.results[0].value.stackError).toBeDefined();
                expect(loggerSpy.mock.results[0].value.arg1).toBe(extraArgs.arg1);
            });
        });
        describe('WARN', () => {
            it('Expected keep the log message', () => {
                Logger.warn(message);
                expect(loggerSpy.mock.results[0].value.message).toBe(message);
            });
            it('Expected log object to contains extra arguments', () => {
                Logger.warn('Teste', extraArgs);
                expect(loggerSpy.mock.results[0].value.arg1).toBe(extraArgs.arg1);
                expect(loggerSpy.mock.results[0].value.arg2).toBe(extraArgs.arg2);
                expect(loggerSpy.mock.results[0].value.arg3).toBe(extraArgs.arg3);
                expect(loggerSpy.mock.results[0].value.arg4).toBe(extraArgs.arg4);
            });

            it('Expected log object to contains error parameter', () => {
                Logger.warn('Teste', error);

                expect(loggerSpy.mock.results[0].value.errorMessage).toBeDefined();
                expect(loggerSpy.mock.results[0].value.errorMessage).toBe(error.message);
                expect(loggerSpy.mock.results[0].value.stackError).toBeDefined();
            });

            it('Expected log object to contains multiple parameter', () => {
                Logger.warn('Teste', extraArgs, error);

                expect(loggerSpy.mock.results[0].value.errorMessage).toBeDefined();
                expect(loggerSpy.mock.results[0].value.errorMessage).toBe(error.message);
                expect(loggerSpy.mock.results[0].value.stackError).toBeDefined();
                expect(loggerSpy.mock.results[0].value.arg1).toBe(extraArgs.arg1);
            });
        });
        describe('ERROR', () => {
            it('Expected keep the log message', () => {
                Logger.error(message);
                expect(loggerSpy.mock.results[0].value.message).toBe(message);
            });
            it('Expected log object to contains extra arguments', () => {
                Logger.error('Teste', extraArgs);
                expect(loggerSpy.mock.results[0].value.arg1).toBe(extraArgs.arg1);
                expect(loggerSpy.mock.results[0].value.arg2).toBe(extraArgs.arg2);
                expect(loggerSpy.mock.results[0].value.arg3).toBe(extraArgs.arg3);
                expect(loggerSpy.mock.results[0].value.arg4).toBe(extraArgs.arg4);
            });

            it('Expected log object to contains error parameter', () => {
                Logger.error('Teste', error);

                expect(loggerSpy.mock.results[0].value.errorMessage).toBeDefined();
                expect(loggerSpy.mock.results[0].value.errorMessage).toBe(error.message);
                expect(loggerSpy.mock.results[0].value.stackError).toBeDefined();
            });

            it('Expected log object to contains multiple parameter', () => {
                Logger.error('Teste', extraArgs, error);

                expect(loggerSpy.mock.results[0].value.errorMessage).toBeDefined();
                expect(loggerSpy.mock.results[0].value.errorMessage).toBe(error.message);
                expect(loggerSpy.mock.results[0].value.stackError).toBeDefined();
                expect(loggerSpy.mock.results[0].value.arg1).toBe(extraArgs.arg1);
            });
        });
    });
});
