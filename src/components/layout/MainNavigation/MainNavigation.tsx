import React from 'react';
import InternalLink from '@/components/elements/InternalLink';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: '-100%' },
  visible: { opacity: 1, y: 0 },
};

interface MainNavigationItemProps {
  target: string;
}

interface MainNavigationComposition {
  Item: React.FC<MainNavigationItemProps>;
}

const MainNavigationItem: React.FC<MainNavigationItemProps> = ({
  target,
  children,
}) => (
  <InternalLink target={target} activeClassName="text-gray-50">
    <a className="text-gray-300">{children}</a>
  </InternalLink>
);

const MainNavigation: React.FC & MainNavigationComposition = ({ children }) => (
  <div className="p-2">
    <nav className="list-none flex -mx-2">
      {React.Children.map(children, (child, index) => (
        <li className="flex-auto px-2 select-none">
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 * index + 1 }}
          >
            {child}
          </motion.div>
        </li>
      ))}
    </nav>
  </div>
);

MainNavigation.Item = MainNavigationItem;

export default MainNavigation;
