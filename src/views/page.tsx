import React from 'react';
import PageTemplate from '@/components/templates/page';
import {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import MainNavigation from '@/components/layout/main-navigation';
import { Greeter } from '@/lib/greeter';
import { navigationService, pageService } from '@/services';
import { Logger, createLogger } from '@/lib/logger';

if (process.env.NODE_ENV === 'production' && process.browser) {
  const greeter = new Greeter(
    console,
    'color: #bada55; font-family: monospace;',
  );
  greeter.greet();
}

const PageView: NextPage = ({
  mainNavigation,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <PageTemplate
    before={<MainNavigation navigation={mainNavigation.data} />}
    page={page.data}
  />
);

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const logger: Logger = createLogger('PageView');

  let slug;

  if (!params) {
    slug = 'home';
  } else if (params.slug && typeof params.slug === 'string') {
    slug = params.slug;
  } else if (params.slug && Array.isArray(params.slug)) {
    slug = params.slug.join('/');
  } else {
    throw new Error('No slug found.');
  }

  logger.info('Requesting pageService with', slug);
  const page = await pageService.getPage(slug);
  logger.info('Received page', page);

  logger.info('Requesting mainNavigation...');
  const mainNavigation = await navigationService.getMainNavigation();
  logger.info('Received mainNavigation', mainNavigation);

  return {
    props: {
      mainNavigation,
      page,
    },
  };
};

export default PageView;
