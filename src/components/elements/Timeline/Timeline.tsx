import React from 'react';
import styles from './timeline.module.css';
import Reveal from '@/components/animations/FadeIn';

interface TimelineItemProps {
  time: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ time, children }) => (
  <div className={styles['timeline-item']}>
    <div className={styles['timeline-item__time']}>
      <span className={styles['timeline-item__time-label']}>{time}</span>
    </div>
    <div className={styles['timeline-item__info']}>{children}</div>
  </div>
);

interface TimelineComposition {
  Item: React.FC<TimelineItemProps>;
}

const Timeline: React.FC & TimelineComposition = ({ children }) => {
  return (
    <ul className={styles['timeline-list']}>
      {React.Children.map(children, (child) => (
        <li className={styles['timeline-list-item']}>
          <Reveal>{child}</Reveal>
        </li>
      ))}
    </ul>
  );
};

Timeline.Item = TimelineItem;

export default Timeline;
