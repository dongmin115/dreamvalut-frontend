/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { albumCoverSystemProps } from '@/types/albumCover.ts';
import Link from 'next/link';
import Image from 'next/image';
import { matchMedia } from '@/util/matchMedia.ts';

function AlbumCoverSystem({
  image,
  title,
  Id,
  curation,
}: albumCoverSystemProps) {
  const [albumRandomColor, setAlbumRandomColor] = useState('');
  const [albumSize, setAlbumSize] = useState<number>(40); // 앨범 커버 크기
  matchMedia();

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

  useEffect(() => {
    if (matchMedia() === '2xl') {
      setAlbumSize(40);
    } else if (matchMedia() === 'xl') {
      setAlbumSize(32);
    } else {
      setAlbumSize(28);
    }
  }, []);

  window.addEventListener('resize', () => {
    if (matchMedia() === '2xl') {
      setAlbumSize(40);
    } else if (matchMedia() === 'xl') {
      setAlbumSize(32);
    } else {
      setAlbumSize(28);
    }
  });

  return (
    <>
      <Link
        href={`/${curation === 'tag' ? 'tag' : 'playlist'}/${Id}`}
        className="hover-bg-opacity flex h-32 cursor-pointer flex-col items-center justify-center px-4 xl:h-40 2xl:h-48"
      >
        <figure className={`relative h-${albumSize} w-${albumSize} rounded-lg`}>
          <Image
            src={image}
            alt="Album cover"
            className="rounded-lg"
            layout="fill"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            objectFit="cover"
          />
        </figure>

        <div
          className={`z-10 -mt-28 xl:-mt-32 2xl:-mt-40 h-${albumSize} w-${albumSize} rounded-lg ${albumRandomColor} flex flex-wrap items-center justify-center bg-opacity-50 px-2 font-bold text-white xl:text-lg`}
        >
          <p
            className={`drop-shadow-text z-20 flex h-${albumSize} w-${albumSize} text-md z-20 flex-wrap items-center justify-center font-bold xl:text-lg`}
          >
            {title}
          </p>
        </div>
        {/* <p
          className={`z-20 flex h-16 w-${albumSize} text-md items-start justify-start overflow-hidden text-ellipsis whitespace-nowrap pt-4 text-white xl:text-lg`}
        >
          {title}
        </p> */}
      </Link>
    </>
  );
}

export default AlbumCoverSystem;
