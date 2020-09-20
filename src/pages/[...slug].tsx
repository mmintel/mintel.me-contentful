import React from 'react';
import { defaultLocale, locales } from '@/config';
import { Logger, createLogger } from '@/core/utils';
import PageTemplate from '@/components/templates/page';
import {
  GetStaticPaths,
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Header from '@/components/layout/header';
import MainNavigation from '@/components/layout/main-navigation';
import { Core } from '@/core';
import { QueryParser } from '@/utils/QueryParser';

const core = new Core().init();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const logger: Logger = createLogger('getStaticProps');

  logger.debug('request params', params);

  const queryParser = new QueryParser({
    defaultLocale,
    locales,
    query: params,
  });
  const slug = queryParser.getSlug();
  const locale = queryParser.getLocale();

  logger.debug('found slug in query', slug);
  logger.debug('found locale in query', locale);

  const site = await core.getSite(locale);
  const mainNavigation = await core.getMainNavigation(locale);
  let page;

  try {
    if (site && !slug) {
      logger.debug('requesting homepage with:', site.homepage);
      page = await core.getPage(locale, site.homepage);
    } else if (slug) {
      logger.debug('requesting page with:', slug);
      page = await core.getPage(locale, slug);
    } else {
      logger.error('no slug provided.');
      page = null;
    }
  } catch (e) {
    logger.error(e);
    page = null;
  }

  return {
    props: {
      site,
      mainNavigation,
      page,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const logger: Logger = createLogger('getStaticPaths');
  const allPages = await core.getAllPages();
  const paths = allPages.map((page) => `/${page.slug}`);
  logger.info('mapped pages to paths', paths);
  return {
    paths,
    fallback: true,
  };
};

const NotFound: React.FC = () => <div>404 not found</div>;

const PageView: NextPage = ({
  mainNavigation,
  page,
  site,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!page) {
    return <NotFound />;
  }

  return (
    <PageTemplate
      before={
        <Header logo={site.logo}>
          <MainNavigation navigation={mainNavigation} />
        </Header>
      }
      site={site}
      page={page}
    />
  );
};

export default PageView;
