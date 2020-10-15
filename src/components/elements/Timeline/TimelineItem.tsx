import React from 'react';
import styles from './timeline.module.css';

export interface TimelineItemProps {
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

export default TimelineItem;
