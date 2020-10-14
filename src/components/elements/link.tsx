import React, { ReactNode } from 'react';

interface LinkProps {
  href: string;
}

const Link: React.FC<LinkProps> = ({ children, href }) => (
  <a className="text-gray-50 underline" href={href}>
    {children}
  </a>
);

export default Link;
