import { ImageQueryString } from '@/utils/ImageQueryString';
import React from 'react';

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

const Image: React.FC<ImageProps> = ({
  src,
  width,
  height,
  ...props
}) => {
  const queryString = new ImageQueryString();

  if (width) {
    queryString.setWidth(width);
  }

  if (height) {
    queryString.setHeight(height);
  }

  return <img src={src + queryString.value} {...props} />;
};

export default Image;
