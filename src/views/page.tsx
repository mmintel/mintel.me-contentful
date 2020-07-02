import React from 'react';
import PageTemplate from '../components/templates/page';
import { NextPage, NextPageContext } from 'next';
import {
  navigationService,
  NavigationRecord,
  pageService,
  PageRecord,
} from '../modules';
import MainNavigation from '../components/layout/main-navigation';
import { Greeter } from '../utils/greeter';

if (process.env.NODE_ENV === 'production') {
  const greeter = new Greeter(
    console,
    'color: #bada55; font-family: monospace;',
  );
  greeter.greet();
}

export interface PageContext {
  page: PageRecord;
  mainNavigation: NavigationRecord;
}

const PageView: NextPage<PageContext> = ({
  mainNavigation,
  page,
}: PageContext) => (
  <PageTemplate
    before={<MainNavigation navigation={mainNavigation.data} />}
    page={page.data}
  />
);

PageView.getInitialProps = async ({
  req,
}: NextPageContext): Promise<PageContext> => {
  const page = await pageService.getPage(req.url === '/' ? 'home' : req.url);
  const mainNavigation = await navigationService.getMainNavigation();
  return {
    page,
    mainNavigation,
  };
};

export default PageView;
