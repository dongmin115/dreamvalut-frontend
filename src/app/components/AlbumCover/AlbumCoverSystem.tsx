/* eslint-disable import/no-unresolved */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { albumCoverSystemProps } from '@/types/albumCover.ts';
import Link from 'next/link';
import Image from 'next/image';

function AlbumCoverSystem({
  image,
  title,
  Id,
  curation,
}: albumCoverSystemProps) {
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
  // console.log('image : ', image);
  return (
    <>
      <Link
        href={`/${curation === 'tag' ? 'tag' : 'playlist'}/${Id}`}
        className="hover-bg-opacity flex h-72 cursor-pointer flex-col items-center justify-center px-4"
      >
        <figure className="relative h-40 w-40 rounded-lg">
          <Image
            src={
              image === 'default'
                ? 'https://i.ibb.co/26Bt8jw/Dream-Vault-Logo-BGO.png'
                : image
            }
            alt="Album cover"
            className="rounded-lg"
            layout="fill"
            objectFit="cover"
          />
        </figure>

        <div
          className={`z-10 -mt-40 h-40 w-40 rounded-lg ${albumRandomColor} opacity-50`}
        />
        <p
          className={
            'drop-shadow-text z-20 -mt-40 flex h-40 w-40 flex-wrap items-center justify-center text-xl font-bold'
          }
        >
          {title}
        </p>
        <p className="z-20 flex h-16 w-40 items-start justify-center pt-4 text-xl text-white">
          {title}
        </p>
      </Link>
    </>
  );
}

export default AlbumCoverSystem;
