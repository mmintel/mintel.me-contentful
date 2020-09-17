import React from 'react';
import InternalLink from '@/components/elements/internal-link';
import { Navigation } from '@/lib/core/features/navigation/domain';

interface MainNavigationProps {
  navigation: Navigation;
}

const MainNavigation = ({ navigation }: MainNavigationProps) => (
  <div>
    {navigation.title}
    <ul>
      {navigation.items.map(item => (
        <li key={item.id}>
          {item.page?.slug && item.internal && (
            <InternalLink href={item.page.slug}>
              {item.title} {item.internal && <span>(internal)</span>}
            </InternalLink>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default MainNavigation;
