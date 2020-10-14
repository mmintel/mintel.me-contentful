import React from 'react';
import cx from 'classnames';

interface SectionProps {
  spacing?: 'small' | 'medium' | 'large';
}

const Section: React.FC<SectionProps> = ({ spacing, children }) => {
  const spaces = {
    small: 'my-8',
    medium: 'my-12',
    large: 'my-16',
  };
  return (
    <section className={cx('container mx-auto', spacing && spaces[spacing])}>
      {children}
    </section>
  );
};

export default Section;
