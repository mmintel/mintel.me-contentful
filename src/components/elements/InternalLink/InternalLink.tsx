import React, { Children } from 'react';
import Link from 'next/link';
import { useActiveRoute } from '@/hooks/useActiveRoute';
import cx from 'classnames';
import { useActivePathRoute } from '@/hooks/useActivePathRoute';

interface InternalLinkProps {
  activeClassName?: string;
  activePathClassName?: string;
  target: string;
}

const InternalLink: React.FC<InternalLinkProps> = ({
  target,
  activeClassName,
  activePathClassName,
  children,
}) => {
  const active = useActiveRoute(target);
  const activePath = useActivePathRoute(target);
  const child = Children.only(children) as React.ReactElement<any>;

  if (active) {
    return React.cloneElement(child, {
      className: active
        ? cx('cursor-default', activeClassName)
        : child.props.className,
    });
  }

  return (
    <Link href={target}>
      {React.cloneElement(child, {
        className: activePath ? activePathClassName : child.props.className,
      })}
    </Link>
  );
};

export default InternalLink;
