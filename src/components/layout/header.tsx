import React, { ReactNode } from 'react';
import { Image } from '../elements';

interface HeaderProps {
  logo: string;
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ logo, children }) => (
  <div>
    <Image src={logo} width={100} />
    {children}
  </div>
);

export default Header;
