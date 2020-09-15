import { UseCaseError } from './UseCaseError';

describe('UseCaseError', () => {
  it('should add the correct name', () => {
    const useCaseError = new UseCaseError('foo');
    expect(useCaseError.name).toEqual('UseCaseError');
  });
});
