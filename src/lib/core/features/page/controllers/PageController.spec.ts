import { GetPageUseCase } from '../usecases';
import { PageController } from './PageController';

const mockUseCase: jest.Mocked<GetPageUseCase> = {
  execute: jest.fn(),
};

describe('PageController', () => {
  it('should initialize without crashing', () => {
    expect(() => new PageController(mockUseCase)).not.toThrow();
  });

  describe('getMainNavigation', () => {
    it('should execute the useCase', async () => {
      expect(mockUseCase.execute).not.toHaveBeenCalled();

      const controller = new PageController(mockUseCase);
      await controller.getPage('foo');

      expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
      expect(mockUseCase.execute).toHaveBeenCalledWith({
        slug: 'foo',
      });
    });
  });
});
