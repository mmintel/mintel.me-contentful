import React from 'react';
import PageTemplate from '@/components/templates/page';
import {
  GetStaticPaths,
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
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

  return {
    props: {
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
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <PageTemplate
    before={<MainNavigation navigation={mainNavigation} />}
    page={page}
  />
);

export default PageView;
