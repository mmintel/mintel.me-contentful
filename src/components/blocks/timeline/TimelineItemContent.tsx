import Markdown from '@/components/elements/markdown';
import React from 'react';
import { TimelineItem } from '.';

interface TimelineItemContentProps {
  item: TimelineItem;
}

const TimelineItemContent: React.FC<TimelineItemContentProps> = ({ item }) => (
  <div>
    {item.title && <h2 className="font-bold text-gray-50 text-lg mb-2">{item.title}</h2>}
    {item.description && <Markdown source={item.description} />}
  </div>
)

export default TimelineItemContent;
