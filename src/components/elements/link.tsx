import React from 'react';
import NextLink from 'next/link';
import { usePageContext } from '@/context/PageContext';
import { UrlGenerator } from '@/utils/UrlGenerator';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, children }) => {
  const { currentLocale, defaultLocale, site } = usePageContext();
  const urlGenerator = new UrlGenerator({
    currentLocale: currentLocale.url,
    defaultLocale: defaultLocale.url,
    homepage: site.homepage,
  });
  const url = urlGenerator.generate(href);
  return <NextLink href={url}>{children}</NextLink>;
};

export { Link };
