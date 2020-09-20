import { Site } from '../../domain';
import { SiteGateway } from '../../gateways';
import { GetSite } from './GetSite';

const mockSite = new Site({
  id: '123',
  title: 'foo',
  logo: 'foo',
  homepage: 'foo',
});

const mockGateway: jest.Mocked<SiteGateway> = {
  getSite: jest.fn(),
};

describe('GetSite', () => {
  it('initializes without crashing', () => {
    expect(() => new GetSite(mockGateway)).not.toThrow();
  });

  describe('execute', () => {
    it('calls the gateway', async () => {
      mockGateway.getSite.mockResolvedValue(mockSite);
      expect(mockGateway.getSite).not.toHaveBeenCalled();

      const useCase = new GetSite(mockGateway);
      await useCase.execute({ locale: 'de-DE' });

      expect(mockGateway.getSite).toHaveBeenCalledTimes(1);
    });

    it('returns a site if found', async () => {
      mockGateway.getSite.mockResolvedValue(mockSite);
      const useCase = new GetSite(mockGateway);
      const site = await useCase.execute({ locale: 'de-DE' });

      expect(site).toBeInstanceOf(Site);
    });

    it('returns an error if not found', async () => {
      mockGateway.getSite.mockRejectedValue('Not found');

      const useCase = new GetSite(mockGateway);
      await expect(useCase.execute({ locale: 'de-DE' })).rejects.toThrow();
    });
  });
});
