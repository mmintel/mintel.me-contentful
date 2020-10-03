import { PageComponent } from '@/core/features/page/domain/PageComponent';
import React from 'react';
import Timeline from './Timeline';

interface BlockRegistry {
  [key: string]: React.FC<any>;
}

const registeredBlocks: BlockRegistry = {
  Timeline,
};

interface BlocksProps {
  blocks: PageComponent[];
}

const Blocks: React.FC<BlocksProps> = ({ blocks }) => (
  <>
    {blocks.map((block) => {
      const Component = registeredBlocks[block.type];
      return <Component key={block.id} {...block} />;
    })}
  </>
);

export default Blocks;
