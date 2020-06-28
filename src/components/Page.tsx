import React from 'react';
import Head from 'next/head';
import RichText from './RichText';
import { Page as PageModel } from '../models/page';

interface PageProps {
  page: PageModel;
}

const Page = ({ page }: PageProps) => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>{page.title}</div>
    <RichText document={page.components} />
  </div>
);

export default Page;
