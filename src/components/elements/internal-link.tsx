import React, { Children } from 'react';
import Link from 'next/link';
import { useActiveRoute } from '@/hooks/useActiveRoute';
import cx from 'classnames';

interface InternalLinkProps {
  activeClassName?: string;
  target: string;
  children: React.ReactNode;
}

const InternalLink: React.FC<InternalLinkProps> = ({
  target,
  activeClassName,
  children,
}) => {
  const { active, activePath } = useActiveRoute(target);
  const child = Children.only(children) as React.ReactElement<any>;

  if (active) {
    return React.cloneElement(child, {
      className: cx(
        'cursor-default',
        activePath ? activeClassName : child.props.className,
      ),
    });
  }

  return (
    <Link href={target}>
      {React.cloneElement(child, {
        className: activePath ? activeClassName : child.props.className,
      })}
    </Link>
  );
};

export default InternalLink;
