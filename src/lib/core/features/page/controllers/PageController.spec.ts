import { Page } from '../domain';
import { GetPageUseCase } from '../usecases';
import { PageController } from './PageController';

const mockUseCase: jest.Mocked<GetPageUseCase> = {
  execute: jest.fn(),
};

const mockPage = new Page({
  id: 'foo',
  components: {
    json: {},
  },
  description: 'foofoo',
  slug: 'foo-bar',
  title: 'fingfong',
});

describe('PageController', () => {
  it('should initialize without crashing', () => {
    expect(() => new PageController(mockUseCase)).not.toThrow();
  });

  describe('getPage', () => {
    it('should execute the useCase', async () => {
      expect(mockUseCase.execute).not.toHaveBeenCalled();
      mockUseCase.execute.mockResolvedValue(mockPage);

      const controller = new PageController(mockUseCase);
      await controller.getPage('foo-bar');

      expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
      expect(mockUseCase.execute).toHaveBeenCalledWith({
        slug: 'foo-bar',
      });
    });

    it('transforms domain model to DTO', async () => {
      mockUseCase.execute.mockResolvedValue(mockPage);

      const controller = new PageController(mockUseCase);
      const page = await controller.getPage('foo-bar');

      expect(page).not.toBeInstanceOf(Page);
      expect(page.id).toEqual(mockPage.id);
    });
  });
});
