import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/core/features/navigation/domain';

interface MainNavigationProps {
  navigation: Navigation;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ navigation }) => (
  <div>
    {navigation.title}
    <ul>
      {navigation.items.map(item => (
        <li key={item.id}>
          {item.page?.slug && item.internal && (
            <Link href={item.page.slug === 'home' ? '/' : item.page.slug}>
              <a>
                {item.title} {item.internal && <span>(internal)</span>}
              </a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default MainNavigation;
