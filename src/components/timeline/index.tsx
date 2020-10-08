import React from 'react';
import TimelineItem from './TimelineItem';
import TimelineItemContent from './TimelineItemContent';
import Spacing from '@/components/elements/spacing';

interface TimelineProps {
  id: string;
  type: string;
  title: string;
  spacing: string;
  itemsCollection: {
    items: TimelineItem[];
  };
}

export interface TimelineItem {
  title: string;
  time: string;
  description: string;
  sys: {
    id: string;
  };
}

export interface TimelineComponentProps {
  item: TimelineItem;
}

const Timeline: React.FC<TimelineProps> = ({ spacing, title, itemsCollection }) => {
  return (
    <Spacing spacing={spacing}>
      <section className="container mx-auto">
        <h1 className="text-2xl text-center font-bold text-gray-50">{title}</h1>
        <ul className="max-w-4xl mx-auto my-16">
          {itemsCollection.items.map((item, index) => {
            return (
              <li key={item.sys.id}>
                <TimelineItem time={item.time} reverse={!!(index % 2)} first={index === 0} last={index + 1 === itemsCollection.items.length}>
                  <TimelineItemContent item={item} />
                </TimelineItem>
              </li>
            );
          })}
        </ul>
      </section>
    </Spacing>
  )
};

export default Timeline;
