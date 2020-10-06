import React from 'react';
import { TimelineComponentProps } from '.';

const Work: React.FC<TimelineComponentProps> = ({ item }) => (
  <div>{item.title}</div>
);

export default Work;
