import React from 'react';
import cx from 'classnames';
import styles from './styles.module.css';

interface TimelineItemProps {
  reverse?: boolean;
  first?: boolean;
  last?: boolean;
  children: React.ReactNode;
  time: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ first, last, reverse, time, children }) => (
  <div className={cx(styles['timeline-item'], first && styles['timeline-item--first'], last && styles['timeline-item--last'])}>
    <div className={styles['timeline-item__info']}>
      { !reverse && children }
    </div>
    <div className={styles['timeline-item__time']}>
      <span className={styles['timeline-item__time-label']}>{time}</span>
    </div>
    <div className={styles['timeline-item__info']}>
      { reverse && children }
    </div>
  </div>
);

TimelineItem.defaultProps = {
  reverse: false,
}

export default TimelineItem;
