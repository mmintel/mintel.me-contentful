import React from 'react';
import Unregistered from './Unregistered';
import Conference from './Conference';
import Work from './Work';
import Education from './Education';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  id: string;
  type: string;
  title: string;
  itemsCollection: {
    items: TimelineItem[];
  };
}

interface TimelineItem {
  type: string;
  title: string;
  time: string;
  sys: {
    id: string;
  };
}

export interface TimelineComponentProps {
  item: TimelineItem;
}

interface TimelineRegistry {
  [key: string]: React.FC<TimelineComponentProps>;
}

const timelineRegistry: TimelineRegistry = {
  Conference,
  Work,
  Education,
};

const Timeline: React.FC<TimelineProps> = ({ title, itemsCollection }) => (
  <section className="container mx-auto">
    <h1 className="text-2xl text-center font-bold text-gray-50">{title}</h1>
    <ul className="max-w-2xl mx-auto my-8">
      {itemsCollection.items.map((item, index) => {
        const Component = timelineRegistry[item.type] || Unregistered;
        return (
          <li key={item.sys.id}>
            <TimelineItem time={item.time} reverse={!!(index % 2)} first={index === 0} last={index + 1 === itemsCollection.items.length}>
              <Component item={item} />
            </TimelineItem>
          </li>
        );
      })}
    </ul>
  </section>
);

export default Timeline;
