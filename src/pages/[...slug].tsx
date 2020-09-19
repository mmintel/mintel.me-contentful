import React from 'react';
import { Logger } from "tslog";
import PageTemplate from '@/components/templates/page';
import {
  GetStaticPaths,
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Header from '@/components/layout/header';
import MainNavigation from '@/components/layout/main-navigation';
import { Core } from '@/core';
import { QueryParser } from '@/utils/QueryParser';

const core = new Core().init();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const logger =  new Logger({ name: "getStaticProps" });
  const queryParser = new QueryParser(params);
  const slug = queryParser.getSlug();
  const language = queryParser.getLanguage();


  const site = await core.getSite(language);
  const mainNavigation = await core.getMainNavigation(language)
  let page;

  try {
    if (site && !slug) {
      logger.debug(`no slug received, homepage is: "${site.homepage}".`);
      page = await core.getPage(language, site.homepage);
    } else if (slug) {
      page = await core.getPage(language, slug);
    } else {
      logger.error('no slug provided.')
      page = null;
    }
  } catch(e) {
    logger.error(e)
    page = null;
  }

  return {
    props: {
      site,
      mainNavigation,
      page,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPages = await core.getAllPages();
  const paths = allPages.map(page => `/${page.slug}`);
  return {
    paths,
    fallback: true,
  };
};

const NotFound: React.FC = () => <div>404 not found</div>;

const PageView: NextPage = ({
  mainNavigation,
  page,
  site,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!page) {
    return <NotFound />;
  }

  return (
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
};

export default PageView;
