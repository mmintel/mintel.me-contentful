import { ContentfulImageQueryString } from '@/utils/ContentfulImageQueryString';
import React from 'react';

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
}

export const Image: React.FC<ImageProps> = ({
  src,
  width,
  height,
  ...props
}) => {
  const queryString = new ContentfulImageQueryString();

  if (width) {
    queryString.setWidth(width);
  }

  if (height) {
    queryString.setHeight(height);
  }

  return <img src={src + queryString.value} {...props} />;
};
