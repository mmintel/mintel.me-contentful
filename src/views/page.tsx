import React from 'react';
import Document from '../components/Page';
import { NextPage, NextPageContext } from 'next';
import {
  Record,
  navigationService,
  Navigation,
  pageService,
  Page,
} from '../modules';

export interface PageContext {
  page: Record<Page>;
  mainNavigation: Record<Navigation>;
}

const PageView: NextPage<PageContext> = ({ page }: PageContext) => (
  <Document page={page.data} />
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
