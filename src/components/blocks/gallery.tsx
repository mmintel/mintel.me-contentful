import React from 'react';

interface GalleryProps {
  title: string;
}

const Gallery: React.FC<GalleryProps> = ({ title }: GalleryProps) => {
  return <div>Gallery {title}</div>;
};

export default Gallery;
