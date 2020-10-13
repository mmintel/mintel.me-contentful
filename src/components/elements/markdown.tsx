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

interface MarkdownProps {
  source?: string;
}

const Markdown: React.FC<MarkdownProps> = ({ source }) => (
  <ReactMarkdown source={source} renderers={renderers} />
);

export default Markdown;
