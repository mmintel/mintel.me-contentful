import { getAllLifeEvents } from '@/core';
import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import Title from '../components/elements/title';
import Timeline, { TimelineItem } from '../components/elements/timeline';
import { LifeEvent } from '@/core/domain';

interface AboutPageProps {
  lifeEvents: LifeEvent[];
}

const AboutPage: NextPage<AboutPageProps> = ({ lifeEvents }) => {
  return <>
    <Title title="About" />
    <Timeline title="My life in a nutshell" items={lifeEvents.map((lifeEvent): TimelineItem => ({
      title: lifeEvent.title || 'Missing title',
      description: lifeEvent.description,
      id: lifeEvent.sys.id,
      time: `${lifeEvent.month}.${lifeEvent.year}`,
    }))} />
  </>
}

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
  const lifeEvents = await getAllLifeEvents();
  return {
    props: {
      lifeEvents
    },
  }
}
