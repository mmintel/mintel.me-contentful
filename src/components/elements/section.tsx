import React from 'react';
import cx from 'classnames';

interface SectionProps {
  spacing: string;
}

interface Spaces {
  [key: string]: string;
}

const Section: React.FC<SectionProps> = ({ spacing, children }) => {
  const spaces: Spaces = {
    small: 'my-8',
    medium: 'my-12',
    large: 'my-16',
  }
  return <section className={cx("container mx-auto", spaces[spacing])} >{children}</section>
}

export default Section;
