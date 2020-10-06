import React from 'react';
import { TimelineComponentProps } from '.';

const Unregistered: React.FC<TimelineComponentProps> = ({ item }) => (
  <div>
    &quot;{item.type}&quot; is not registered in Timeline.
  </div>
);

export default Unregistered;
