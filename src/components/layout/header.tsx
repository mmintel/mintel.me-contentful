import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from '../elements/image';

interface HeaderProps {
  logo: string;
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ logo, children }) => (
  <div className="container mx-auto">
    <div className="py-4 flex justify-between items-center">
      <Link href="/">
        <a>
          <Image src={logo} width={100} className="w-12 rounded-full border-1 border-gray-500" />
        </a>
      </Link>
      {children}
    </div>
  </div>
);

export default Header;
