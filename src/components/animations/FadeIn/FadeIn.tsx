import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useViewportCenterScrollProgress } from '@/hooks/useViewportCenterScrollProgress';

const FadeIn: React.FC = ({ children }) => {
  const ref = useRef(null);
  const { start, end } = useScrollProgress(ref);
  const viewportCenterScrollProgress = useViewportCenterScrollProgress();
  const scrollProgress = useMotionValue(viewportCenterScrollProgress);
  const opacity = useTransform(scrollProgress, [start, end], [0.5, 1]);

  useEffect(() => {
    scrollProgress.set(viewportCenterScrollProgress);
  }, [viewportCenterScrollProgress, scrollProgress]);

  return (
    <div ref={ref}>
      <motion.div style={{ opacity }}>{children}</motion.div>
    </div>
  );
};

export default FadeIn;
