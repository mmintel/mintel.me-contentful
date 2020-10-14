import React from 'react';
import Head from 'next/head';
import { useApp } from '@/context/AppContext';

interface TitleProps {
  title?: string;
}

const Title: React.FC<TitleProps> = ({title}) => {
  const { site } = useApp();
  return (
    <Head>
      <title>{ title ? `${title} | ${site.title}` : site.title}</title>
    </Head>
  )
 }

 export default Title;
