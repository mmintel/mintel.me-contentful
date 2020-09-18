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

const main = new Main().init();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryParser = new QueryParser(params);
  const slug = queryParser.getSlug() || 'home';
  const language = queryParser.getLanguage();

  const page = await main.getPage(language, slug);
  const mainNavigation = await main.getMainNavigation(language);
  const site = await main.getSite(language);

  return {
    props: {
      site,
      mainNavigation,
      page,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPages = await main.getAllPages();
  const paths = allPages.map(page => `/${page.slug}`);
  return {
    paths,
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
