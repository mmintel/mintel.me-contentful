import React from 'react';
import Section from '../section';
import TimelineItem from './TimelineItem';
import Markdown from '@/components/elements/markdown';

interface TimelineProps {
  title: string;
  items: TimelineItem[];
}

export interface TimelineItem {
  title: string;
  time: string;
  description?: string;
  id: string;
}

export interface TimelineComponentProps {
  item: TimelineItem;
}

const Timeline: React.FC<TimelineProps> = ({ title, items }) => {
  return (
    <Section spacing="small">
      <h1 className="text-2xl text-center font-bold text-gray-50">{title}</h1>
      <ul className="max-w-4xl mx-auto my-16">
        {items.map((item, index) => {
          return (
            <li key={item.id}>
              <TimelineItem time={item.time} reverse={!!(index % 2)} first={index === 0} last={index + 1 === items.length}>
                <div>
                  {item.title && <h2 className="font-bold text-gray-50 text-lg mb-2">{item.title}</h2>}
                  {item.description && <Markdown source={item.description} />}
                </div>
              </TimelineItem>
            </li>
          );
        })}
      </ul>
    </Section>
  )
};

export default Timeline;
