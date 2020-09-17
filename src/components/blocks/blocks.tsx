import React, { ReactNode } from 'react';
import { BLOCKS, Document, Block, Inline } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Gallery from './gallery';
import Stage from './stage';

interface BlocksProps {
  blocks: Document;
}

interface Entries {
  [key: string]: ReactNode;
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
      const fields = node.data.target.fields;
      const id = node.data.target.sys.id;
      const entries: Entries = {
        gallery: <Gallery {...fields} />,
        stage: <Stage {...fields} />,
      };
      return entries[id];
    },
  },
};

const Blocks: React.FC<BlocksProps> = ({ blocks }) => {
  return <>{documentToReactComponents(blocks, options)}</>;
};

export default Blocks;
