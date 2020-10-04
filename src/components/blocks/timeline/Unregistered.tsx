import React from 'react';
import { TimelineComponentProps } from '.';
import TimelineItem from './TimelineItem';

const Unregistered: React.FC<TimelineComponentProps> = ({ item }) => (
  <TimelineItem>
    &quot;{item.type}&quot; is not registered in Timeline.
  </TimelineItem>
);

export default Unregistered;
