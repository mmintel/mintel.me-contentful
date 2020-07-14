import React from 'react';

interface StageProps {
  title: string,
}

const Stage = ({ title }: StageProps) => {
  return <div>Stage {title}</div>;
};

export default Stage;
