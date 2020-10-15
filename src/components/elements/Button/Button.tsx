import React from 'react';
import cx from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => (
    <button
      className={cx('inline-block bg-gray-700 p-3 rounded-full', className)}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  ),
);

export default Button;
