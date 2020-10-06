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
import { SiteDTO } from '@/core/features/site/dtos';
import { NavigationDTO } from '@/core/features/navigation/dtos';
import Footer from '@/components/layout/footer';

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

  let site: SiteDTO;
  let mainNavigation: NavigationDTO;
  let page: PageDTO | null;

  try {
    site = await core.getSite(locale.value);
    logger.debug('received site', site);
  } catch (e) {
    logger.error('Something went wrong fetching site');
    throw new Error(e);
  }

  try {
    mainNavigation = await core.getMainNavigation(locale.value);
    logger.debug('received mainNavigation', mainNavigation);
  } catch (e) {
    logger.error('Something went wrong fetching mainNavigation', e);
    throw new Error(e);
  }

  try {
    if (site && !slug) {
      logger.debug('requesting homepage with:', site.homepage);
      page = await core.getPage(locale.value, site.homepage);
    } else if (slug) {
      logger.debug('requesting page with:', slug);
      page = await core.getPage(locale.value, slug);
      logger.debug('received page', page);
    } else {
      logger.error('no slug provided.');
      page = null;
    }
    logger.debug('received page', page);
  } catch (e) {
    logger.warn('Something went wrong fetching the page', e);
    page = null;
  }

  return {
    props: {
      site,
      mainNavigation,
      page,
      locales,
      defaultLocale,
      locale,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const logger: Logger = createLogger('getStaticPaths');
  const paths: string[] = [];

  for (const locale of locales) {
    let site: SiteDTO;

    try {
      site = await core.getSite(locale.value);
      logger.info('received site', site);
    } catch (e) {
      logger.error('Something went wrong fetching site', e);
    }

    try {
      const pages = await core.getAllPages(locale.value);
      logger.debug('received pages', pages);

      pages.forEach((page) => {
        const urlGenerator = new UrlGenerator({
          localeURL: locale.url,
          defaultLocaleURL: defaultLocale.url,
          homepage: site.homepage,
        });
        const url = urlGenerator.generate(page);

        logger.debug('got url from urlGenerator', url);

        // '/' is handled by index route
        if (url !== '/') {
          paths.push(url);
        }
      });
    } catch (e) {
      logger.error('Something went wrong fetching page', e);
    }
  }

  logger.info('mapped pages to paths', paths);

  return {
    paths,
    fallback: false,
  };
};

const PageView: NextPage = ({
  mainNavigation,
  page,
  site,
  locales,
  locale,
  defaultLocale,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageContextProvider value={{ page, site, locale, locales, defaultLocale }}>
      <PageTemplate
        before={
          <Header logo={site.logo}>
            <MainNavigation navigation={mainNavigation} />
          </Header>
        }
        after={
          <Footer />
        }
        site={site}
        page={page}
      />
    </PageContextProvider>
  );
};

export default PageView;
