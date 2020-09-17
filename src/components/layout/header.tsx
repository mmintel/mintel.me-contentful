import React, { ReactNode } from 'react';

interface HeaderProps {
  logo: string;
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ logo, children }) => (
  <div>
    <img src={logo} />
    {children}
  </div>
);

export default Header;
