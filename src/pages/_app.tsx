import React from 'react';
import Head from "next/head";
import { AppProps, AppContext as NextAppContext } from 'next/app'
import { AppProvider } from '../context/AppContext';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import "../styles/tailwind.css";
import { getSite } from '@/core';
import { Site } from '@/core/domain';

interface MyAppProps extends AppProps {
  site: Site;
}

function MyApp({ site, Component, pageProps }: MyAppProps): React.ReactNode {
  return (
    <AppProvider site={site}>
      <div className="bg-gray-800 text-gray-200 flex flex-col min-h-screen">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className="flex-auto">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

MyApp.getInitialProps = async (ctx: NextAppContext) => {
  const site = await getSite();
  return {
    site
  }
}

export default MyApp;
