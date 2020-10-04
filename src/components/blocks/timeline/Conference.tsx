import React from 'react';
import { TimelineComponentProps } from '.';
import TimelineItem from './TimelineItem';

const Conference: React.FC<TimelineComponentProps> = ({ item }) => (
  <TimelineItem time={item.time}>{item.title}</TimelineItem>
);

export default Conference;
