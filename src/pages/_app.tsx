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
          <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192"  href="/icons/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#171717" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#171717"></meta>
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
