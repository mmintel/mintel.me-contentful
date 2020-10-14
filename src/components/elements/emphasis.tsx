import React from 'react';

const Emphasis: React.FC = ({ children }) => (
  <em className="marker-yellow-500 text-yellow-800 not-italic">{children}</em>
);

export default Emphasis;
