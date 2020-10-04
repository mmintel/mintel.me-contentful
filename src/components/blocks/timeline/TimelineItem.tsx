import React from 'react';

interface TimelineItemProps {
  time: string;
  children: React.ReactNode;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ time, children }) => (
  <div className="shadow-sm p-4 rounded-md bg-white">
    <span className="font-bold">{time}</span>
    {children}
  </div>
);

export default TimelineItem;
