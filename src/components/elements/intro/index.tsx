import React, { useEffect, useRef, useState } from 'react';
import { random } from 'lodash';
import useSize from '@react-hook/size';
import { AnimatePresence, motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useRouter } from 'next/router';

interface IntroProps {
  title: string;
  icons: Icon[];
}

interface Icon {
  title: string;
  image: string;
  id: string;
}

interface IconTileProps {
  icon: Icon;
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

const IconTile: React.FC<IconTileProps> = ({
  mouseX,
  mouseY,
  frameWidth,
  frameHeight,
  xFactor,
  yFactor,
  icon,
  xOffset,
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
      exit={{
        y: '-100vh',
        transition: {
          duration: 1,
        },
      }}
    >
      <div className="bg-gray-700 rounded-full w-32 h-32 flex items-center justify-center">
        <img src={icon.image} alt={icon.title} className="w-12" />
      </div>
    </motion.div>
  );
};

const Intro: React.FC<IntroProps> = ({ title, icons }) => {
  const { x, y } = useMousePosition();
  const node = React.useRef(null);
  const [width, height] = useSize(node);
  const router = useRouter();

  return (
    <section
      className="w-screen h-screen max-w-full relative overflow-hidden"
      ref={node}
    >
      <div className="mt-24 relative z-10">
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl uppercase text-white leading-none max-w-xl mx-auto font-bold">
          {title}
        </h1>
      </div>

      <ul>
        {icons.map((icon, index) => (
          <li key={icon.id}>
            <AnimatePresence exitBeforeEnter>
              <IconTile
                key={router.route}
                xOffset={(width / icons.length) * index}
                mouseX={x}
                mouseY={y}
                icon={icon}
                frameHeight={height}
                frameWidth={width}
                xFactor={random(0.1, 0.3)}
                yFactor={random(0.1, 0.3)}
              />
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Intro;
