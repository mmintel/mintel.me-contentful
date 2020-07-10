import React from 'react';
import InternalLink from '../elements/internal-link';
import { Navigation } from '../../models';

interface MainNavigationProps {
  navigation: Navigation;
}

const MainNavigation = ({ navigation }: MainNavigationProps) => (
  <div>
    {navigation.title}
    <ul>
      {navigation.items.map(item => (
        <li key={item.meta.id}>
          <InternalLink href={item.data.page.data.slug}>
            {item.data.title} {item.data.internal && <span>(internal)</span>}
          </InternalLink>
        </li>
      ))}
    </ul>
  </div>
);

export default MainNavigation;
