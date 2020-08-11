import React from 'react';
import PageTemplate from '@/components/templates/page';
import {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  GetStaticPaths,
} from 'next';
import MainNavigation from '@/components/layout/main-navigation';
import { Greeter } from '@/lib/greeter';
import { navigationService, pageService } from '@/services';
import { Logger, createLogger } from '@/lib/logger';
import { Locale } from '@/models';

if (process.env.NODE_ENV === 'production' && process.browser) {
  const greeter = new Greeter(
    console,
    'color: green; background-color: #333; font-family: monospace;',
  );
  greeter.greet();
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['/about'],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const logger: Logger = createLogger('PageView');
  let slug = 'home';

  if (params?.slug && typeof params.slug === 'string') {
    slug = params.slug;
  } else if (params?.slug && Array.isArray(params.slug)) {
    slug = params.slug.join('/');
  }

  logger.info('Requesting pageService with', slug);
  const page = await pageService.getPage(slug, Locale.DE);
  logger.info('Received page', page);

  logger.info('Requesting mainNavigation...');
  const mainNavigation = await navigationService.getMainNavigation(Locale.DE);
  logger.info('Received mainNavigation', mainNavigation);

  return {
    props: {
      mainNavigation,
      page,
    },
  };
};

const PageView: NextPage = ({
  mainNavigation,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <PageTemplate
    before={<MainNavigation navigation={mainNavigation.data} />}
    page={page.data}
  />
);

export default PageView;
