import React from 'react';
import { InternalLink } from '../elements/internal-link';
import { Navigation } from '@/core/features/navigation/domain';

interface MainNavigationProps {
  navigation: Navigation;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ navigation }) => (
  <div>
    {navigation.title}
    <ul>
      {navigation.items.map((item) => (
        <li key={item.id}>
          {item.page && item.internal && (
            <InternalLink target={item.page}>
              <a>
                {item.title} {item.internal && <span>(internal)</span>}
              </a>
            </InternalLink>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default MainNavigation;
