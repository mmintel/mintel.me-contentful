import React from 'react';
import InternalLink from '../elements/internal-link';

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
      {items.map((item) => (
        <li key={item.id} className="flex-auto px-2 select-none">
          <InternalLink target={item.target} activeClassName="text-gray-50">
            <a className="text-gray-300">{item.title}</a>
          </InternalLink>
        </li>
      ))}
    </nav>
  </div>
);

export default MainNavigation;
