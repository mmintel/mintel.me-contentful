import { Locale } from '@/lib/core/domain';
import { SiteDTO } from '../../dtos';
import { SiteGateway } from '../../gateways';
import { GetSite } from './GetSite';

const mockPage: SiteDTO = {
  id: '123',
  title: 'foo',
  logo: 'foo',
};

const mockGateway: jest.Mocked<SiteGateway> = {
  getSite: jest.fn(),
};

describe('GetSite', () => {
  beforeEach(() => {
    mockGateway.getSite.mockResolvedValue(mockPage);
  });

  it('initializes without crashing', () => {
    expect(() => new GetSite(mockGateway)).not.toThrow();
  });

  describe('execute', () => {
    it('calls the gateway', async () => {
      expect(mockGateway.getSite).not.toHaveBeenCalled();

      const useCase = new GetSite(mockGateway);
      await useCase.execute({ locale: Locale.DE });

      expect(mockGateway.getSite).toHaveBeenCalledTimes(1);
    });

    it('returns a page if found', async () => {
      const useCase = new GetSite(mockGateway);
      const page = await useCase.execute({ locale: Locale.DE });

      expect(page).toEqual(expect.objectContaining(mockPage));
    });

    it('returns an error if not found', async () => {
      mockGateway.getSite.mockRejectedValue('Not found');

      const useCase = new GetSite(mockGateway);
      await expect(useCase.execute({ locale: Locale.DE })).rejects.toThrow();
    });
  });
});
