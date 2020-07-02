import React, { ReactNode } from 'react';
import Head from 'next/head';
import Blocks from '../blocks';
import { Page as PageModel } from '../../modules';

interface PageTemplateProps {
  page: PageModel;
  before?: ReactNode;
  after?: ReactNode;
}

const PageTemplate = ({ page, before, after }: PageTemplateProps) => (
  <div className="container">
    <Head>
      <title>{page.title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {before}
    <main>
      <Blocks blocks={page.components} />
    </main>
    {after}
  </div>
);

export default PageTemplate;
