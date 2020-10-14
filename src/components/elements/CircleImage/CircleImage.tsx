import React from 'react';

interface CircleImageProps {
  alt?: string;
  src: string;
}

const CircleImage: React.FC<CircleImageProps> = ({ alt, src }) => {
  return (
    <div className="bg-gray-700 rounded-full w-32 h-32 flex items-center justify-center select-none">
      <img src={src} alt={alt} className="w-12" />
    </div>
  );
};

export default CircleImage;
