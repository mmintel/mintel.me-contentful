import React from 'react';
import Title from '../components/elements/title';
import { GetStaticProps } from 'next';
import { getAllHighlightedTechnologies } from '@/core';
import { Technology } from '@/core/domain';
import Intro from '@/components/elements/intro';

interface IndexProps {
  technologies: Technology[];
}

const IndexPage: React.FC<IndexProps> = ({ technologies }) => {
  return (
    <>
      <Title />
      <Intro
        title="Hey there, I'm Marc, a Frontend Developer from Germany."
        icons={technologies.map((t) => ({
          ...t,
          image: t.icon.url,
          id: t.sys.id,
        }))}
      />
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
