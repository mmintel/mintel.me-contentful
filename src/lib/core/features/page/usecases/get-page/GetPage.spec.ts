import { PageDTO } from '../../dtos';
import { PageGateway } from '../../gateways';
import { GetPage } from './GetPage';

const mockPage: PageDTO = {
  id: '123',
  description: 'foo',
  slug: 'foo-bar',
  title: 'foofoo',
  components: {
    json: {},
  },
};

const mockGateway: jest.Mocked<PageGateway> = {
  getPage: jest.fn(),
};

describe('GetPage', () => {
  beforeEach(() => {
    mockGateway.getPage.mockResolvedValue(mockPage);
  });

  it('initializes without crashing', () => {
    expect(() => new GetPage(mockGateway)).not.toThrow();
  });

  describe('execute', () => {
    it('calls the gateway', async () => {
      expect(mockGateway.getPage).not.toHaveBeenCalled();

      const useCase = new GetPage(mockGateway);
      await useCase.execute({ slug: mockPage.slug });

      expect(mockGateway.getPage).toHaveBeenCalledTimes(1);
      expect(mockGateway.getPage).toHaveBeenCalledWith(mockPage.slug);
    });

    it('returns a page if found', async () => {
      const useCase = new GetPage(mockGateway);
      const page = await useCase.execute({ slug: mockPage.slug });

      expect(page).toEqual(expect.objectContaining(mockPage));
    });

    it('returns an error if not found', async () => {
      mockGateway.getPage.mockRejectedValue('Not found');

      const useCase = new GetPage(mockGateway);
      await expect(useCase.execute({ slug: mockPage.slug })).rejects.toThrow();
    });
  });
});
