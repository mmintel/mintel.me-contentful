import React from 'react';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Gallery from './entries/Gallery';
import Stage from './entries/Stage';

interface RichtTextProps {
  document: Document;
}

interface Entries {
  [key: string]: JSX.Element;
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node: Document) => {
      const fields = node.data.target.fields;
      const id = node.data.target.sys.contentType.sys.id;
      const entries: Entries = {
        gallery: <Gallery {...fields} />,
        stage: <Stage {...fields} />,
      };
      return entries[id];
    },
  },
};

const RichText = ({ document }: RichtTextProps) => {
  return <>{documentToReactComponents(document, options)}</>;
};

export default RichText;
