import React from 'react';
import PageTemplate from '@/components/templates/page';
import { NextPage } from 'next';
import MainNavigation from '@/components/layout/main-navigation';
import { App } from '@/app/App';
import { Locale } from '@/app/shared/domain';
import { Navigation } from '@/app/features/navigation/domain';
import { Page } from '@/app/features/page/domain';
import { QueryParser } from '@/utils/query-parser';

interface PageViewProps {
  mainNavigation: Navigation;
  page: Page;
}

const PageView: NextPage<PageViewProps | undefined> = ({
  mainNavigation,
  page,
}) => (
  <PageTemplate
    before={<MainNavigation navigation={mainNavigation} />}
    page={page}
  />
);

PageView.getInitialProps = async ({ req, res, query }) => {
  const app = new App({
    locale: Locale.DE,
  }).init();
  const logger = app.createLogger('PageView');
  const queryParser = new QueryParser(query);
  const slug = queryParser.getSlug();

  const page = await app.getPage(slug);
  const mainNavigation = await app.getMainNavigation();

  if (res && (mainNavigation.isError || page.isError)) {
    if (mainNavigation.isError) {
      logger.error(
        'Error receiving mainNavigation',
        mainNavigation.getError()?.message!,
      );
    } else if (page.isError) {
      logger.error('Error receiving page', page.getError()?.message!);
    }

    res.statusCode = 500;
    res.end('Whoooops, something went wrong.');
    return;
  }

  return {
    mainNavigation: mainNavigation.getValue(),
    page: page.getValue(),
  };
};

export default PageView;
