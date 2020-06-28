import React from 'react';
import Document from '../components/Page';
import { NextPage, NextPageContext } from 'next';
import { apiClient } from '../services';
import { Page } from '../models/page';

export interface PageBySlugProps {
  page: Page;
}

const PageBySlug: NextPage<PageBySlugProps> = ({ page }: PageBySlugProps) => (
  <Document page={page} />
);

PageBySlug.getInitialProps = async ({
  req,
}: NextPageContext): Promise<PageBySlugProps> => {
  const page = await apiClient.getPage(req.url === '/' ? 'home' : req.url);
  return {
    page,
  };
};

export default PageBySlug;
