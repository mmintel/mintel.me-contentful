import React, { ReactNode } from 'react';

interface MarkProps {
  children: ReactNode;
}

const Mark: React.FC<MarkProps> = ({ children }) => (<mark className="marker-yellow-500">{children}</mark>)

export default Mark;
