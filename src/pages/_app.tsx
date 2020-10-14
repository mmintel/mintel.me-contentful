import React from 'react';
import { AppProps } from 'next/app';
import { AppProvider } from '../context/AppContext';
import { getSite } from '@/core';
import { Site } from '@/core/domain';
import { motion, AnimatePresence } from 'framer-motion';

import 'react-tippy/dist/tippy.css';
import '../styles/tailwind.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppIcons from '@/components/elements/AppIcons';
import InternalLink from '@/components/elements/InternalLink';
import Image from '@/components/elements/Image';
import MainNavigation from '@/components/layout/MainNavigation/MainNavigation';

const headerVariants = {
  initial: { opacity: 0, y: '-100%' },
  visible: { opacity: 1, y: 0 },
};

const mainVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

interface MyAppProps extends AppProps {
  site: Site;
}

function MyApp({
  site,
  Component,
  pageProps,
  router,
}: MyAppProps): React.ReactNode {
  const handleExitComplete = () => {
    if (typeof window !== 'undefined') {
      console.log('IS COMPLETE');

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AppProvider site={site}>
      <AppIcons />
      <div className="bg-gray-800 text-gray-200 flex flex-col min-h-screen relative">
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
            <MainNavigation.Item target="/about">About me</MainNavigation.Item>
          </MainNavigation>
        </Header>
        <main className="flex-auto">
          <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
            <motion.div
              key={router.route}
              variants={mainVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{
                duration: 1,
              }}
            >
              <Component {...pageProps} key={router.route} />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
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
