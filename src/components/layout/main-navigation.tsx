import React from 'react';
import InternalLink from '../elements/internal-link';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: '-100%' },
  visible: { opacity: 1, y: 0 },
};

interface MainNavigationProps {
  items: NavigationItem[];
}

interface NavigationItem {
  id: string;
  target: string;
  title: string;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ items }) => (
  <div className="p-2">
    <nav className="list-none flex -mx-2">
      {items.map((item, index) => (
        <li key={item.id} className="flex-auto px-2 select-none">
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 * index + 1 }}
          >
            <InternalLink target={item.target} activeClassName="text-gray-50">
              <a className="text-gray-300">{item.title}</a>
            </InternalLink>
          </motion.div>
        </li>
      ))}
    </nav>
  </div>
);

export default MainNavigation;
