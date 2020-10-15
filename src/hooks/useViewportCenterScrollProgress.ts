import { throttle } from 'lodash';
import { useEffect, useState } from 'react';

export const useViewportCenterScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  const getCenterScrollProgress = (y: number) => {
    if (typeof window === 'undefined') return 0;
    const viewportCenter = window.innerHeight / 2 + y;
    const totalHeight = document.body.clientHeight;
    return viewportCenter / totalHeight;
  };

  useEffect(() => {
    const scrollHandler = () => {
      setProgress(getCenterScrollProgress(window.pageYOffset));
    };

    setProgress(getCenterScrollProgress(window.pageYOffset));

    window.addEventListener('scroll', throttle(scrollHandler, 100));

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [setProgress]);

  return progress;
};
