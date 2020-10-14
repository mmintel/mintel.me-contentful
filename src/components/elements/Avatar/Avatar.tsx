import React from 'react';
import Image from '../Image';

interface AvatarProps {
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => (
  <Image src={src} className="w-12 rounded-full border-1 border-gray-500" />
);

export default Avatar;
