import React from 'react';
import Link from 'next/link';

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
}

const InternalLink = ({ href, children }: InternalLinkProps) => {
  let url = href;

  // make sure url starts with slash
  if (!url.startsWith('/')) {
    url = `/${url}`;
  }

  // adjust index page
  if (url === '/home') {
    url = '/';
  }

  return (
    <Link href={url}>
      <a href={url}>{children}</a>
    </Link>
  );
};

export default InternalLink;
