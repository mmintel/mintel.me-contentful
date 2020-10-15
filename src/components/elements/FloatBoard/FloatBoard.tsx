import React, { useEffect, useRef, useState } from 'react';
import { random } from 'lodash';
import useSize from '@react-hook/size';
import { useMousePosition } from '@/hooks/useMousePosition';
import { motion } from 'framer-motion';

interface AnimatedChildProps {
  mouseX: number;
  mouseY: number;
  frameWidth: number;
  frameHeight: number;
  xFactor: number;
  yFactor: number;
  xOffset: number;
}

interface Position {
  top: number;
  left: number;
}

const AnimatedChild: React.FC<AnimatedChildProps> = ({
  mouseX,
  mouseY,
  frameWidth,
  frameHeight,
  xFactor,
  yFactor,
  xOffset,
  children,
}) => {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const node = useRef(null);
  const [width] = useSize(node);

  useEffect(() => {
    setPosition({
      top: random(20, 55),
      left: xOffset,
    });
  }, [width, frameWidth, xOffset]);

  const yFactorRef = useRef(yFactor);
  const xFactorRef = useRef(xFactor);

  const y = yFactorRef.current * (frameHeight / 2 - mouseY);
  const x = xFactorRef.current * (frameWidth / 2 - mouseX);

  const coordsTransition = {
    type: 'spring',
    mass: 0.5,
    damping: 50,
  };

  return (
    <motion.div
      ref={node}
      className="absolute"
      whileTap={{ rotate: 360 }}
      initial={{
        opacity: 0,
      }}
      style={{
        top: `${position.top}%`,
        left: `${position.left}px`,
      }}
      animate={{
        opacity: 1,
        x,
        y,
      }}
      transition={{
        x: coordsTransition,
        y: coordsTransition,
        opacity: {
          delay: 1,
          duration: 2,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

interface FloatBoardProps {
  head?: React.ReactNode;
}

const FloatBoard: React.FC<FloatBoardProps> = ({ head, children }) => {
  const { x, y } = useMousePosition();
  const node = React.useRef(null);
  const [width, height] = useSize(node);

  return (
    <section
      className="w-screen h-screen max-w-full relative overflow-hidden"
      ref={node}
    >
      {head && <div className="relative z-10">{head}</div>}

      {children && (
        <ul>
          {React.Children.map(children, (child, index) => (
            <li>
              <AnimatedChild
                xOffset={(width / React.Children.count(children)) * index}
                mouseX={x}
                mouseY={y}
                frameHeight={height}
                frameWidth={width}
                xFactor={random(0.1, 0.3)}
                yFactor={random(0.1, 0.3)}
              >
                {child}
              </AnimatedChild>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FloatBoard;
