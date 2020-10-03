import React from 'react';

interface TimelineProps {
  id: string;
  type: string;
  title: string;
  itemsCollection: {
    items: TimelineItem[];
  };
}

interface TimelineItem {
  title: string;
}

const Timeline: React.FC<TimelineProps> = ({ title }) => (
  <div>Timeline here {title}</div>
);

export default Timeline;
