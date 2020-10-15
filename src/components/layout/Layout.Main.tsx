import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const LayoutMain: React.FC = ({ children }) => {
  const router = useRouter();

  const handleExitComplete = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main className="flex-auto">
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <motion.div
          key={router.route}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{
            duration: 1,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default LayoutMain;
