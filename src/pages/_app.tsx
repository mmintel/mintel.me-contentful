import React from 'react';
import { AppProps } from 'next/app';
import { AppProvider } from '../context/AppContext';
import { getSite } from '@/core';
import { Site } from '@/core/domain';

import 'react-tippy/dist/tippy.css';
import '../styles/global.css';
import '../styles/tailwind.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppIcons from '@/components/app/AppIcons';
import Image from '@/components/elements/Image';
import MainNavigation from '@/components/layout/MainNavigation/MainNavigation';
import Layout from '@/components/layout';

interface MyAppProps extends AppProps {
  site: Site;
}

function MyApp({ site, Component, pageProps }: MyAppProps): React.ReactNode {
  return (
    <AppProvider site={site}>
      <AppIcons />
      <Layout>
        <Header>
          <Header.Brand>
            {site.avatar ? (
              <Image
                src={site?.avatar.url}
                width={100}
                className="w-12 rounded-full border-1 border-gray-500"
              />
            ) : (
              <>{site.title}</>
            )}
          </Header.Brand>
          <MainNavigation>
            <MainNavigation.Item target="/">Home</MainNavigation.Item>
            <MainNavigation.Item target="/about-me">
              About me
            </MainNavigation.Item>
          </MainNavigation>
        </Header>
        <Layout.Main>
          <Component {...pageProps} />
        </Layout.Main>
        <Footer />
      </Layout>
    </AppProvider>
  );
}

MyApp.getInitialProps = async () => {
  const site = await getSite();
  return {
    site,
  };
};

export default MyApp;
