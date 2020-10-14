import React from 'react';
import { motion } from 'framer-motion';
import InternalLink from '@/components/elements/InternalLink';

const variants = {
  initial: { opacity: 0, y: '-100%' },
  visible: { opacity: 1, y: 0 },
};

const HeaderBrand: React.FC = ({ children }) => (
  <motion.div
    variants={variants}
    initial="initial"
    animate="visible"
    transition={{ delay: 1 }}
  >
    <InternalLink target="/">
      <a>{children}</a>
    </InternalLink>
  </motion.div>
);

export default HeaderBrand;
