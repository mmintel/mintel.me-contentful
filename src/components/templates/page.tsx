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
  <div className="bg-gray-800 text-gray-200 flex flex-col h-screen">
    <Head>
      <title>
        {page.title} - {site.title}
      </title>
      <meta name="description" content={page.description} />
    </Head>
    {before}
    <main className="flex-auto">
      <Blocks blocks={page.components} />
    </main>
    {after}
  </div>
);

export default PageTemplate;
