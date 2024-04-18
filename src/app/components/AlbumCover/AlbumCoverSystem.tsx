/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
import { albumCoverSystemProps } from '@/types/albumCover.ts';

function AlbumCoverSystem({ image, title }: albumCoverSystemProps) {
  const [albumRandomColor, setAlbumRandomColor] = useState('');

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 한 번만 랜덤한 색상을 선택
    const randomAlbumColorList = [
      'bg-blue-300',
      'bg-green-300',
      'bg-red-300',
      'bg-yellow-300',
      'bg-indigo-300',
      'bg-purple-300',
      'bg-pink-300',
      'bg-gray-300',
    ];
    const randomIndex = Math.floor(Math.random() * randomAlbumColorList.length);
    setAlbumRandomColor(randomAlbumColorList[randomIndex]);
  }, []); // 빈 배열을 넣어서 처음 렌더링 시에만 실행되도록 함

  return (
    <div className="flex flex-col m-4 w-56 h-72 items-center justify-center hover-bg-opacity cursor-pointer">
      {/* <Image
        src={image}
        alt="Album cover"
        className="rounded-lg"
        width={192}
        height={192}
      /> */}
      <img src={image} alt="Album cover" className="rounded-lg mt-40" />
      <div
        className={`h-48 w-48 rounded-lg z-10 -mt-48 ${albumRandomColor} opacity-50`}
      />
      <p className={'text-xl z-20 font-bold drop-shadow-text -mt-28'}>
        {title}
      </p>
      <p className="text-white text-xl z-20 mt-24">{title}</p>
    </div>
  );
}

export default AlbumCoverSystem;
