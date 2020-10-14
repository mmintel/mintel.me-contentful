import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

interface Position {
  x: number;
  y: number;
}

export const useMousePosition = (): Position => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseEvent = (e: MouseEvent) => {
      setPosition({
        x: e.screenX,
        y: e.screenY,
      });
    };

    const throttledHandleMouseEvent = throttle(handleMouseEvent, 100);

    window.addEventListener('mousemove', throttledHandleMouseEvent);

    return () => {
      window.removeEventListener('mousemove', throttledHandleMouseEvent);
    };
  }, []);

  return position;
};
