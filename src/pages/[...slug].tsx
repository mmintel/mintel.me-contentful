import React from 'react';
import PageTemplate from '@/components/templates/page';
import {
  GetStaticPaths,
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Header from '@/components/layout/header';
import MainNavigation from '@/components/layout/main-navigation';
import { Main } from '@/lib';
import { QueryParser } from '@/utils/QueryParser';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryParser = new QueryParser(params);
  const slug = queryParser.getSlug() || 'home';
  const language = queryParser.getLanguage();
  const app = new Main({
    language,
  }).init();

  const page = await app.getPage(slug);
  const mainNavigation = await app.getMainNavigation();
  const site = await app.getSite();

  return {
    props: {
      site,
      mainNavigation,
      page,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['/about'],
    fallback: false,
  };
};

const PageView: NextPage = ({
  mainNavigation,
  page,
  site,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <PageTemplate
    before={
      <Header logo={site.logo}>
        <MainNavigation navigation={mainNavigation} />
      </Header>
    }
    site={site}
    page={page}
  />
);

export default PageView;
