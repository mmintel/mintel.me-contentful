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
import { PageDTO } from '@/core/features/page/dtos';
import { PageContextProvider } from '@/context/PageContext';
import { UrlGenerator } from '@/utils/UrlGenerator';

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

  const site = await core.getSite(locale.value);
  const mainNavigation = await core.getMainNavigation(locale.value);
  let page;

  try {
    if (site && !slug) {
      logger.debug('requesting homepage with:', site.homepage);
      page = await core.getPage(locale.value, site.homepage);
    } else if (slug) {
      logger.debug('requesting page with:', slug);
      page = await core.getPage(locale.value, slug);
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
      locales,
      defaultLocale,
      currentLocale: locale,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const logger: Logger = createLogger('getStaticPaths');
  let allPages: PageDTO[] = [];
  const paths: string[] = [];

  for (const locale of locales) {
    const site = await core.getSite(locale.value);
    const pages = await core.getAllPages(locale.value);

    pages.forEach((page) => {
      const urlGenerator = new UrlGenerator({
        currentLocale: locale.url,
        defaultLocale: defaultLocale.url,
        homepage: site.homepage,
      });
      const url = urlGenerator.generate(page.slug);

      // '/' is handled by index route
      if (url !== '/') {
        paths.push();
      }
    });

    allPages = [...allPages, ...pages];
  }

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
  locales,
  currentLocale,
  defaultLocale,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!page) {
    return <NotFound />;
  }

  return (
    <PageContextProvider
      value={{ page, site, currentLocale, locales, defaultLocale }}
    >
      <PageTemplate
        before={
          <Header logo={site.logo}>
            <MainNavigation navigation={mainNavigation} />
          </Header>
        }
        site={site}
        page={page}
      />
    </PageContextProvider>
  );
};

export default PageView;
