import React, { ReactNode } from 'react';
import Head from 'next/head';
import Blocks from '@/components/blocks';
import { Page } from '@/app/features/page/domain';

interface PageTemplateProps {
  page: Page;
  before?: ReactNode;
  after?: ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ page, before, after }) => (
  <div className="container">
    <Head>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {before}
    <main>{page.components && <Blocks blocks={page.components} />}</main>
    {after}
  </div>
);

export default PageTemplate;
