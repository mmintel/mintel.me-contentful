import React from 'react';
import Unregistered from './Unregistered';
import Conference from './Conference';
import Work from './Work';
import Education from './Education';

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
    <h1 className="text-2xl text-center font-bold">{title}</h1>
    <ul className="max-w-2xl mx-auto my-8">
      {itemsCollection.items.map((item) => {
        const Component = timelineRegistry[item.type] || Unregistered;
        return (
          <li key={item.sys.id} className="mb-2">
            <Component item={item} />
          </li>
        );
      })}
    </ul>
  </section>
);

export default Timeline;
