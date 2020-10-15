import React from 'react';
import styles from './timeline.module.css';
import Reveal from '@/components/animations/FadeIn';
import cx from 'classnames';
import TimelineItem, { TimelineItemProps } from './TimelineItem';

interface TimelineProps {
  className?: string;
}

interface TimelineComposition {
  Item: React.FC<TimelineItemProps>;
}

const Timeline: React.FC<TimelineProps> & TimelineComposition = ({
  className,
  children,
}) => {
  return (
    <ul className={cx(styles['timeline-list'], className)}>
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
