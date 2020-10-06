import React, { Children } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { usePageContext } from '@/context/PageContext';
import { UrlGenerator } from '@/utils/UrlGenerator';
import { Page } from '@/core/features/page/domain';
import { useActiveRoute } from '@/hooks/useActiveRoute';

interface InternalLinkProps {
  activeClassName?: string;
  target: Page;
  children: React.ReactNode;
}

const InternalLink: React.FC<InternalLinkProps> = ({ target, activeClassName, children }) => {
  const { locale, defaultLocale, site } = usePageContext();
  const urlGenerator = new UrlGenerator({
    localeURL: locale.url,
    defaultLocaleURL: defaultLocale.url,
    homepage: site.homepage,
  });
  const url = urlGenerator.generate(target);
  const active = useActiveRoute(url);
  const child = Children.only(children) as React.ReactElement<any>;

  return (
    <Link href={url}>
      {React.cloneElement(child, { className: cx(child.props.className, active && activeClassName) })}
    </Link>
  );
};

export default InternalLink;
