import React from 'react';
import InternalLink from '@/components/elements/InternalLink';
import Button from '@/components/elements/Button';

const Custom404: React.FC = () => (
  <div className="container mx-auto mt-24">
    <h1 className="text-2xl font-bold text-white text-center">
      Whooooops, sorry there is nothing!
    </h1>
    <p className="mt-4 text-center text-lg">
      The requested page is not available or might be moved somewhere else.
    </p>
    <div className="mt-8 flex justify-center">
      <InternalLink target="/">
        <Button>Go back home</Button>
      </InternalLink>
    </div>
  </div>
);

export default Custom404;
