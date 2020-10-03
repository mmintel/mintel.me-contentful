import React, { ReactNode } from 'react';
import Head from 'next/head';
import Blocks from '../blocks';
import { Page } from '@/core/features/page/domain';
import { Site } from '@/core/features/site/domain';

interface PageTemplateProps {
  site: Site;
  page: Page;
  before?: ReactNode;
  after?: ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  site,
  page,
  before,
  after,
}) => (
  <div className="container">
    <Head>
      <title>
        {page.title} - {site.title}
      </title>
      <meta name="description" content={page.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {before}
    <main>asd</main>
    {after}
  </div>
);

export default PageTemplate;
