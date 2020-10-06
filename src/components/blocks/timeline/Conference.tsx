import React from 'react';
import { TimelineComponentProps } from '.';

const Conference: React.FC<TimelineComponentProps> = ({ item }) => (
  <div>{item.title}</div>
);

export default Conference;
