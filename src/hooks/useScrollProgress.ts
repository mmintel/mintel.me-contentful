import React, { useLayoutEffect, useState } from 'react';

interface ScrollProgress {
  start: number;
  end: number;
}

export const useScrollProgress = (
  ref: React.RefObject<HTMLElement>,
): ScrollProgress => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const node = ref.current;
    const rect = node.getBoundingClientRect();
    const totalHeight = document.body.clientHeight;

    const offsetTop = node.offsetTop;
    const offsetEnd = offsetTop + rect.height;

    setStart(offsetTop / totalHeight);
    setEnd(offsetEnd / totalHeight);
  }, [setStart, setEnd, ref]);

  return { start, end };
};
