import { createLogger } from './Logger';

describe('Logger', () => {
  describe('createLogger', () => {
    it('creates a namespace of tslog', () => {
      const logger = createLogger('foo');
      expect(logger.settings.name).toEqual('foo');
    });
  });
});
