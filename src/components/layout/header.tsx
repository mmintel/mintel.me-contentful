import React from 'react';
import Link from 'next/link';
import Image from '../elements/image';
import MainNavigation from './main-navigation';
import { useApp } from '@/context/AppContext';


const Header: React.FC = () => {
  const { site } = useApp();
  return (
    <div className="container mx-auto">
      <div className="py-4 flex justify-between items-center">
        <Link href="/">
          <a>
            { site.avatar ? (
              <Image src={site?.avatar.url} width={100} className="w-12 rounded-full border-1 border-gray-500" />
            ) : (
              <>{site.title}</>
            )}
          </a>
        </Link>
        <MainNavigation items={[
          {
            id: 'home',
            target: '/',
            title: 'Home'
          },
          {
            id: 'about',
            target: '/about-me',
            title: 'About me'
          },
        ]} />
      </div>
    </div>
  )
};

export default Header;
