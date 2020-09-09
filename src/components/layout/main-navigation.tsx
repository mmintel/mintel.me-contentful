import React from 'react';
import InternalLink from '@/components/elements/internal-link';
import { Navigation } from '@/old/abstract/types';

interface MainNavigationProps {
  navigation: Navigation;
}

const MainNavigation = ({ navigation }: MainNavigationProps) => (
  <div>
    {navigation.title}
    <ul>
      {navigation.items.map(item => (
        <li key={item.meta.id}>
          <InternalLink href={item.data.page.slug}>
            {item.data.title} {item.data.internal && <span>(internal)</span>}
          </InternalLink>
        </li>
      ))}
    </ul>
  </div>
);

export default MainNavigation;
