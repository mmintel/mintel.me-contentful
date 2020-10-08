import React from 'react';

interface SpacingProps {
  spacing: string;
}

interface Spaces {
  [key: string]: string;
}

const Spacing: React.FC<SpacingProps> = ({ spacing, children }) => {
  const spaces: Spaces = {
    small: 'my-8',
    medium: 'my-12',
    large: 'my-16',
  }

  return <div className={spaces[spacing]}>{children}</div>
}

export default Spacing;
