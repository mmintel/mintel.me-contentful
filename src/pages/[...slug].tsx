import React from 'react';
import PageTemplate from '@/components/templates/page';
import {
  GetStaticPaths,
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import MainNavigation from '@/components/layout/main-navigation';
import { App } from '@/app/App';
import { Locale } from '@/app/shared/domain';
import { QueryParser } from '@/utils/QueryParser';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const app = new App({
    locale: Locale.DE,
  }).init();

  const queryParser = new QueryParser(params);
  const slug = queryParser.getSlug();

  const page = await app.getPage(slug);
  const mainNavigation = await app.getMainNavigation();

  return {
    props: {
      mainNavigation: mainNavigation.toJson(),
      page: page.toJson(),
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
