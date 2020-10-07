import React from 'react';
import ReactMarkdown from 'react-markdown';
import Emphasis from './emphasis';
import Link from './link';

interface Renderers {
  [nodeType: string]: React.ElementType<any>;
}

const renderers: Renderers = {
  link: Link,
  emphasis: Emphasis,
};

const Markdown: React.FC<any> = ({ source }) => (<ReactMarkdown source={source} renderers={renderers} />)

export default Markdown;
