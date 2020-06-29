import React from 'react';
import Document from '../components/Page';
import { NextPage, NextPageContext } from 'next';
import { navigationService, Navigation, pageService, Page } from '../modules';

export interface PageContext {
  page: Page;
  mainNavigation: Navigation;
}

const PageBySlug: NextPage<PageContext> = ({ page }: PageContext) => (
  <Document page={page} />
);

PageBySlug.getInitialProps = async ({
  req,
}: NextPageContext): Promise<PageContext> => {
  const page = await pageService.getPage(req.url === '/' ? 'home' : req.url);
  const mainNavigation = await navigationService.getMainNavigation();
  return {
    page,
    mainNavigation,
  };
};

export default PageBySlug;
