import { LogLevel } from '@/abstract/types/log-level';
import { Logger, LogClient } from './logger';

const mockConsole: LogClient = {
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

describe('ConsoleLogger', () => {
  it('initializes without crashing', () => {
    expect(() => new Logger('Foo', LogLevel.info, mockConsole)).not.toThrow();
  });

  describe('trace', () => {
    describe('when LogLevel is too low', () => {
      it.each(['silent'])(
        'should not log if LogLevel is "%s"',
        (level: unknown) => {
          expect(mockConsole.log).not.toHaveBeenCalled();
          const logger = new Logger('Foo', level as LogLevel, mockConsole);
          logger.trace('bar');
          expect(mockConsole.log).not.toHaveBeenCalled();
        },
      );
    });

    describe('when LogLevel matches', () => {
      it('should log if LogLevel is "trace"', () => {
        expect(mockConsole.log).not.toHaveBeenCalled();
        const logger = new Logger('Foo', LogLevel.trace, mockConsole);
        logger.trace('bar');
        expect(mockConsole.log).toHaveBeenCalledTimes(1);
        expect(mockConsole.log).toHaveBeenCalledWith(
          expect.stringContaining('[Foo]'),
        );
        expect(mockConsole.log).toHaveBeenCalledWith(
          expect.stringContaining('bar'),
        );
      });
    });

    describe('when LogLevel is too high', () => {
      it.each(['debug', 'info', 'warn', 'error', 'fatal'])(
        'should not log if LogLevel is "%s"',
        (level: unknown) => {
          expect(mockConsole.log).not.toHaveBeenCalled();
          const logger = new Logger('Foo', level as LogLevel, mockConsole);
          logger.trace('bar');
          expect(mockConsole.log).not.toHaveBeenCalled();
        },
      );
    });
  });

  describe('debug', () => {
    describe('when LogLevel is too low', () => {
      it.each(['silent', 'trace'])(
        'should not log if LogLevel is "%s"',
        (level: unknown) => {
          expect(mockConsole.log).not.toHaveBeenCalled();
          const logger = new Logger('Foo', level as LogLevel, mockConsole);
          logger.debug('bar');
          expect(mockConsole.log).not.toHaveBeenCalled();
        },
      );
    });

    describe('when LogLevel matches', () => {
      it('should log if LogLevel is "debug"', () => {
        expect(mockConsole.log).not.toHaveBeenCalled();
        const logger = new Logger('Foo', LogLevel.debug, mockConsole);
        logger.debug('bar');
        expect(mockConsole.log).toHaveBeenCalledTimes(1);
        expect(mockConsole.log).toHaveBeenCalledWith(
          expect.stringContaining('[Foo]'),
        );
        expect(mockConsole.log).toHaveBeenCalledWith(
          expect.stringContaining('bar'),
        );
      });
    });

    describe('when LogLevel is too high', () => {
      it.each(['info', 'warn', 'error', 'fatal'])(
        'should not log if LogLevel is "%s"',
        (level: unknown) => {
          expect(mockConsole.log).not.toHaveBeenCalled();
          const logger = new Logger('Foo', level as LogLevel, mockConsole);
          logger.debug('bar');
          expect(mockConsole.log).not.toHaveBeenCalled();
        },
      );
    });
  });

  describe('info', () => {
    describe('when LogLevel is too low', () => {
      it.each(['silent', 'trace', 'debug'])(
        'should not log if LogLevel is "%s"',
        (level: unknown) => {
          expect(mockConsole.log).not.toHaveBeenCalled();
          const logger = new Logger('Foo', level as LogLevel, mockConsole);
          logger.info('bar');
          expect(mockConsole.log).not.toHaveBeenCalled();
        },
      );
    });

    describe('when LogLevel matches', () => {
      it('should log if LogLevel is "info"', () => {
        expect(mockConsole.log).not.toHaveBeenCalled();
        const logger = new Logger('Foo', LogLevel.info, mockConsole);
        logger.info('bar');
        expect(mockConsole.log).toHaveBeenCalledTimes(1);
        expect(mockConsole.log).toHaveBeenCalledWith(
          expect.stringContaining('[Foo]'),
        );
        expect(mockConsole.log).toHaveBeenCalledWith(
          expect.stringContaining('bar'),
        );
      });
    });

    describe('when LogLevel is too high', () => {
      it.each(['warn', 'error', 'fatal'])(
        'should not log if LogLevel is "%s"',
        (level: unknown) => {
          expect(mockConsole.log).not.toHaveBeenCalled();
          const logger = new Logger('Foo', level as LogLevel, mockConsole);
          logger.info('bar');
          expect(mockConsole.log).not.toHaveBeenCalled();
        },
      );
    });
  });

  describe('warn', () => {
    describe('when LogLevel is too low', () => {
      it.each(['silent', 'trace', 'debug', 'info'])(
        'should not log if LogLevel is "%s"',
        (level: unknown) => {
          expect(mockConsole.warn).not.toHaveBeenCalled();
          const logger = new Logger('Foo', level as LogLevel, mockConsole);
          logger.warn('bar');
          expect(mockConsole.warn).not.toHaveBeenCalled();
        },
      );
    });

    describe('when LogLevel matches', () => {
      it('should log if LogLevel is "warn"', () => {
        expect(mockConsole.warn).not.toHaveBeenCalled();
        const logger = new Logger('Foo', LogLevel.warn, mockConsole);
        logger.warn('bar');
        expect(mockConsole.warn).toHaveBeenCalledTimes(1);
        expect(mockConsole.warn).toHaveBeenCalledWith(
          expect.stringContaining('[Foo]'),
        );
        expect(mockConsole.warn).toHaveBeenCalledWith(
          expect.stringContaining('bar'),
        );
      });
    });

    describe('when LogLevel is too high', () => {
      it.each(['error', 'fatal'])(
        'should not log if LogLevel is "%s"',
        (level: unknown) => {
          expect(mockConsole.warn).not.toHaveBeenCalled();
          const logger = new Logger('Foo', level as LogLevel, mockConsole);
          logger.warn('bar');
          expect(mockConsole.warn).not.toHaveBeenCalled();
        },
      );
    });
  });

  describe('error', () => {
    describe('when LogLevel is too low', () => {
      it.each(['silent', 'trace', 'debug', 'info', 'warn'])(
        'should not log if LogLevel is "%s"',
        (level: unknown) => {
          expect(mockConsole.error).not.toHaveBeenCalled();
          const logger = new Logger('Foo', level as LogLevel, mockConsole);
          logger.error('bar');
          expect(mockConsole.error).not.toHaveBeenCalled();
        },
      );
    });

    describe('when LogLevel matches', () => {
      it('should log if LogLevel is "error"', () => {
        expect(mockConsole.error).not.toHaveBeenCalled();
        const logger = new Logger('Foo', LogLevel.error, mockConsole);
        logger.error('bar');
        expect(mockConsole.error).toHaveBeenCalledTimes(1);
        expect(mockConsole.error).toHaveBeenCalledWith(
          expect.stringContaining('[Foo]'),
        );
        expect(mockConsole.error).toHaveBeenCalledWith(
          expect.stringContaining('bar'),
        );
      });
    });

    describe('when LogLevel is too high', () => {
      it.each(['fatal'])(
        'should not log if LogLevel is "%s"',
        (level: unknown) => {
          expect(mockConsole.error).not.toHaveBeenCalled();
          const logger = new Logger('Foo', level as LogLevel, mockConsole);
          logger.error('bar');
          expect(mockConsole.error).not.toHaveBeenCalled();
        },
      );
    });
  });

  describe('fatal', () => {
    describe('when LogLevel is too low', () => {
      it.each(['silent', 'trace', 'debug', 'info', 'warn', 'error'])(
        'should not log if LogLevel is "%s"',
        (level: unknown) => {
          expect(mockConsole.error).not.toHaveBeenCalled();
          const logger = new Logger('Foo', level as LogLevel, mockConsole);
          logger.fatal('bar');
          expect(mockConsole.error).not.toHaveBeenCalled();
        },
      );
    });

    describe('when LogLevel matches', () => {
      it('should log if LogLevel is "fatal"', () => {
        expect(mockConsole.error).not.toHaveBeenCalled();
        const logger = new Logger('Foo', LogLevel.fatal, mockConsole);
        logger.fatal('bar');
        expect(mockConsole.error).toHaveBeenCalledTimes(1);
        expect(mockConsole.error).toHaveBeenCalledWith(
          expect.stringContaining('[Foo]'),
        );
        expect(mockConsole.error).toHaveBeenCalledWith(
          expect.stringContaining('bar'),
        );
      });
    });
  });
});
