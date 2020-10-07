import React, { ReactNode } from 'react';

interface EmphasisProps {
  children: ReactNode;
}

const Emphasis: React.FC<EmphasisProps> = ({ children }) => (<em className="marker-yellow-500 text-yellow-800 not-italic">{children}</em>)

export default Emphasis;
