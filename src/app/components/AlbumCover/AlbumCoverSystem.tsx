/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from 'react';
import { albumCoverSystemProps } from '@/types/albumCover.ts';
import Link from 'next/link';
import Image from 'next/image';

function AlbumCoverSystem({ image, title, id, type }: albumCoverSystemProps) {
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
    <>
      <Link
        href={`/playlist/type=${type}&id=${id}`}
        className="hover-bg-opacity flex h-36 cursor-pointer flex-col items-center justify-center px-4 xl:h-40 2xl:h-44"
      >
        <figure
          className={
            'relative h-32 w-32 rounded-lg xl:h-36 xl:w-36 2xl:h-40 2xl:w-40'
          }
        >
          <Image
            src={image}
            alt="Album cover"
            className="rounded-lg"
            fill
            sizes="100vm"
            priority
          />
        </figure>

        <div
          className={`z-10 -mt-32 h-32 w-32 rounded-lg xl:-mt-36 xl:h-36 xl:w-36 2xl:-mt-40 2xl:h-40 2xl:w-40 ${albumRandomColor} flex flex-wrap items-center justify-center bg-opacity-50 px-2 font-bold text-white xl:text-lg`}
        >
          <p
            className={
              'drop-shadow-text text-md z-20 flex h-32 w-32 flex-wrap items-center justify-center font-bold xl:h-36 xl:w-36 xl:text-lg 2xl:h-40 2xl:w-40'
            }
          >
            {title}
          </p>
        </div>
      </Link>
    </>
  );
}

export default AlbumCoverSystem;
