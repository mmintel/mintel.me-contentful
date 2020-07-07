import React from 'react';
import PageTemplate from '../components/templates/page';
import {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import MainNavigation from '../components/layout/main-navigation';
import { Greeter } from '../lib/greeter';

if (process.env.NODE_ENV === 'production') {
  const greeter = new Greeter(
    console,
    'color: #bada55; font-family: monospace;',
  );
  greeter.greet();
}

const PageView: NextPage = ({
  mainNavigation,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <PageTemplate
    before={<MainNavigation navigation={mainNavigation.data} />}
    page={page.data}
  />
);

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  let url;

  if (!params) {
    url = 'home';
  } else if (params.slug && typeof params.slug === 'string') {
    url = params.slug;
  } else if (params.slug && Array.isArray(params.slug)) {
    url = params.slug.join('/');
  }

  const res = await fetch(`http://localhost:3000/api/page/${url}`);
  const data = await res.json();
  return { props: { data } };
};

export default PageView;
