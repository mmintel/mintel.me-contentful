import React from 'react';
import Image from '../../elements/image';
import MainNavigation from '../main-navigation';
import { useApp } from '@/context/AppContext';
import InternalLink from '../../elements/internal-link';
import styles from './styles.module.css';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: '-100%' },
  visible: { opacity: 1, y: 0 },
};

const Header: React.FC = () => {
  const { site } = useApp();
  return (
    <div className={styles.header}>
      <div className="container mx-auto">
        <div className="py-4 flex justify-between items-center">
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            <InternalLink target="/">
              <a>
                {site.avatar ? (
                  <Image
                    src={site?.avatar.url}
                    width={100}
                    className="w-12 rounded-full border-1 border-gray-500"
                  />
                ) : (
                  <>{site.title}</>
                )}
              </a>
            </InternalLink>
          </motion.div>
          <MainNavigation
            items={[
              {
                id: 'home',
                target: '/',
                title: 'Home',
              },
              {
                id: 'about',
                target: '/about-me',
                title: 'About me',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
