import React from 'react';
import { GetStaticProps } from 'next';
import { getAllHighlightedTechnologies } from '@/core';
import { Technology } from '@/core/domain';
import Title from '@/components/elements/Title';
import FloatBoard from '@/components/animations/FloatBoard';
import CircleImage from '@/components/elements/CircleImage';

interface IndexProps {
  technologies: Technology[];
}

const IndexPage: React.FC<IndexProps> = ({ technologies }) => {
  return (
    <>
      <Title />
      <FloatBoard
        head={
          <div className="mt-24 relative z-10">
            <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl uppercase text-white leading-none max-w-xl mx-auto font-bold">
              Hey there, I&apos;m Marc, a Frontend Developer from Germany
            </h1>
          </div>
        }
      >
        {technologies.map((technology) => (
          <CircleImage
            key={technology.sys.id}
            src={technology.icon.url}
            alt={technology.title}
          />
        ))}
      </FloatBoard>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const technologies = await getAllHighlightedTechnologies();
  return {
    props: {
      technologies,
    },
  };
};

export default IndexPage;
