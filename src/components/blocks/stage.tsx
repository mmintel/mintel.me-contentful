import React from 'react';

interface StageProps {
  title: string;
}

const Stage: React.FC<StageProps> = ({ title }) => {
  return <div>Stage {title}</div>;
};

export default Stage;
