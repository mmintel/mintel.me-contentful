import React from 'react';

interface ButtonProps {
  tag?: React.ElementType;
}

const Button: React.FC<ButtonProps> = ({ tag, children }) => {
  const Component = tag || 'button';
  return (
    <Component className="bg-gray-700 p-3 rounded-full">{children}</Component>
  );
};

export default Button;
