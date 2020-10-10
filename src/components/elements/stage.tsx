import React from 'react';

interface StageProps {
  title: string;
}

const Stage: React.FC<StageProps> = ({ title }) => (
  <section className="container mx-auto py-20">
    <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl uppercase text-white leading-none max-w-xl mx-auto font-bold">{ title }</h1>
  </section>
)

export default Stage;
