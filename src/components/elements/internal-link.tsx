import React, { Children } from 'react';
import Link from 'next/link';
import { useActiveRoute } from '@/hooks/useActiveRoute';

interface InternalLinkProps {
  activeClassName?: string;
  target: string;
  children: React.ReactNode;
}

const InternalLink: React.FC<InternalLinkProps> = ({ target, activeClassName, children }) => {
  const active = useActiveRoute(target);
  const child = Children.only(children) as React.ReactElement<any>;

  return (
    <Link href={target}>
      {React.cloneElement(child, { className: active ? activeClassName : child.props.className })}
    </Link>
  );
};

export default InternalLink;
