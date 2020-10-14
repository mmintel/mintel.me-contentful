import React from 'react';
import cx from 'classnames';
import styles from './timeline.module.css';

interface TimelineItemProps {
  time: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ time, children }) => (
  <div className={cx(styles['timeline-item'])}>
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
    <ul className="max-w-4xl mx-auto my-16">
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};

Timeline.Item = TimelineItem;

export default Timeline;
