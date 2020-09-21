import React from 'react';
import NextLink from 'next/link';
import { usePageContext } from '@/context/PageContext';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

// home = /en
// start = /
// ueber = /ueber
// about = /about

const Link: React.FC<LinkProps> = ({ href, children }) => {
  const { currentLocale, defaultLocale, site } = usePageContext();
  const parts = href.split('/');
  let url = href;

  if (currentLocale?.name === defaultLocale?.name) {
    if (site?.homepage === url) {
      url = '/';
    } else {
      url = `/${url}`;
    }
  } else {
    if (site?.homepage === url) {
      url = `/${currentLocale?.url}/`;
    } else {
      url = `/${currentLocale?.url}/${url}`;
    }
  }

  return <NextLink href={url}>{children}</NextLink>;
};

export { Link };
