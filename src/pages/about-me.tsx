import React from 'react';
import { getAllLifeEvents } from '@/core';
import { GetStaticProps, NextPage } from 'next';
import Title from '@/components/elements/Title';
import Timeline from '@/components/elements/Timeline';
import { LifeEvent } from '@/core/domain';
import Markdown from '@/components/elements/Markdown';
import Section from '@/components/elements/Section';

interface AboutPageProps {
  lifeEvents: LifeEvent[];
}

const AboutPage: NextPage<AboutPageProps> = ({ lifeEvents }) => {
  return (
    <>
      <Title title="About" />
      <Section spacing="small">
        <h1 className="text-2xl text-center font-bold text-gray-50">
          My life in a nutshell
        </h1>
        <Timeline>
          {lifeEvents.map((lifeEvent) => (
            <Timeline.Item
              key={lifeEvent.sys.id}
              time={`${lifeEvent.month}.${lifeEvent.year}`}
            >
              {lifeEvent.title && (
                <h2 className="font-bold text-gray-50 text-lg mb-2">
                  {lifeEvent.title}
                </h2>
              )}
              {lifeEvent.description && (
                <Markdown source={lifeEvent.description} />
              )}
            </Timeline.Item>
          ))}
        </Timeline>
      </Section>
    </>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
  const lifeEvents = await getAllLifeEvents();
  return {
    props: {
      lifeEvents,
    },
  };
};
