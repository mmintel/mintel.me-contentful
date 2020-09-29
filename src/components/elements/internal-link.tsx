import React from 'react';
import Link from 'next/link';
import { usePageContext } from '@/context/PageContext';
import { UrlGenerator } from '@/utils/UrlGenerator';
import { Page } from '@/core/features/page/domain';

interface InternalLinkProps {
  target: Page;
  children: React.ReactNode;
}

const InternalLink: React.FC<InternalLinkProps> = ({ target, children }) => {
  const { locale, defaultLocale, site } = usePageContext();
  const urlGenerator = new UrlGenerator({
    localeURL: locale.url,
    defaultLocaleURL: defaultLocale.url,
    homepage: site.homepage,
  });
  const url = urlGenerator.generate(target);
  return <Link href={url}>{children}</Link>;
};

export { InternalLink };
