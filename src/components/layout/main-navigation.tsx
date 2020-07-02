import React from 'react';
import { Navigation } from '../../modules';

interface MainNavigationProps {
  navigation: Navigation;
}

const MainNavigation = ({ navigation }: MainNavigationProps) => (
  <div>
    {navigation.title}
    <ul>
      {navigation.items.map(item => (
        <li key={item.meta.id}>
          {item.data.title} {item.data.internal && <span>(internal)</span>}
        </li>
      ))}
    </ul>
  </div>
);

export default MainNavigation;
