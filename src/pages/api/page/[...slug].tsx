import { NextApiRequest, NextApiResponse } from 'next';
import { Logger, createLogger } from '../../../lib/logger';
import { navigationService, pageService } from '../../../container';

export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const logger: Logger = createLogger('PageApi');

  logger.info('Route requested with query:', query);

  let slug;

  if (query.slug && Array.isArray(query.slug)) {
    slug = query.slug.join('/');
  } else if (query.slug && typeof query.slug === 'string') {
    slug = query.slug;
  }

  logger.info('Requesting pageService with', slug);
  const page = await pageService.getPage(slug);
  logger.info('Received page', page);

  logger.info('Requesting mainNavigation...');
  const mainNavigation = await navigationService.getMainNavigation();
  logger.info('Received mainNavigation', mainNavigation);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return res.end(
    JSON.stringify({
      page,
      mainNavigation,
    }),
  );
};
