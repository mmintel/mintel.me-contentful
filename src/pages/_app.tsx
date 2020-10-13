import React from 'react';
import { AppProps, AppContext as NextAppContext } from 'next/app';
import { AppProvider } from '../context/AppContext';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import { getSite } from '@/core';
import { Site } from '@/core/domain';
import { motion, AnimatePresence } from 'framer-motion';

import 'react-tippy/dist/tippy.css';
import '../styles/tailwind.css';
import Favicons from '@/components/elements/favicons';

interface MyAppProps extends AppProps {
  site: Site;
}

function MyApp({
  site,
  Component,
  pageProps,
  router,
}: MyAppProps): React.ReactNode {
  return (
    <AppProvider site={site}>
      <div className="bg-gray-800 text-gray-200 flex flex-col min-h-screen relative">
        <Favicons />
        <Header />
        <main className="flex-auto">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.route}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{
                duration: 1,
              }}
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                },
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

MyApp.getInitialProps = async (ctx: NextAppContext) => {
  const site = await getSite();
  return {
    site,
  };
};

export default MyApp;
