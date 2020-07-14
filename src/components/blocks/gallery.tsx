import React from 'react';

interface GalleryProps {
  title: string,
}

const Gallery = ({ title }: GalleryProps) => {
  return <div>Gallery {title}</div>;
};

export default Gallery;
