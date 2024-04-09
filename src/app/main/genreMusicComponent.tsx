/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

'use client';

import { useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { GenreMusicProps } from '../../types/genre.ts';

// 장르별 음악 컴포넌트
function GenreMusic({
  genre,
  bgColor,
  musicImage1,
  musicImage2,
  musicImage3,
  musicTitle1,
  musicTitle2,
  musicTitle3,
}: GenreMusicProps) {
  return (
    <div
      className={`flex flex-col items-center w-72 h-96 rounded-2xl bg-genre-${bgColor} my-12 m-4 mx-8`}
    >
      {/* 위에 단색 배경바 */}
      <div
        className={`flex flex-row items-center w-full h-20 p-8 rounded-t-2xl bg-nv-${bgColor}`}
      >
        <p className="w-11/12 text-2xl text-black font-bold">{genre}</p>
        <IconButton>
          <PlayCircleIcon style={{ fontSize: 50, opacity: 0.7 }} />
        </IconButton>
      </div>

      {/* 음악 정보 */}
      {/* 1번째 음악 */}
      <div className="flex flex-row items-center justify-start m-2 cursor-pointer hover-bg-opacity">
        <img className="w-1/4 m-2" src={musicImage1} />
        <p className="text-lg text-black">{musicTitle1}</p>
      </div>

      {/* 2번째 음악 */}
      <div className="flex flex-row items-center justify-start m-2 cursor-pointer hover-bg-opacity">
        <img className="w-1/4 m-2" src={musicImage2} />
        <p className="text-lg text-black">{musicTitle2}</p>
      </div>

      {/* 3번째 음악 */}
      <div className="flex flex-row items-center justify-start m-2 cursor-pointer hover-bg-opacity">
        <img className="w-1/4 m-2" src={musicImage3} />
        <p className="text-lg text-black">{musicTitle3}</p>
      </div>
    </div>
  );
}

function GenreMusicComponent() {
  const [pageIndex, setPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const musicList = [];
  const [data, setData] = useState<any>([]);
  const handleForwardClick = () => {
    if (Math.ceil(data.length / 3) - 4 > pageIndex) {
      setPageIndex(pageIndex + 1);
    } // 이때 4는 한번에 보여지는 인기음악의 개수
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };
  return (
    <>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div className="w-11/12 h-full flex flex-row items-center justify-start">
        <GenreMusic
          genre="아이돌"
          bgColor={100}
          musicImage1="https://i.ibb.co/4d0pj5j/dynamite.webp"
          musicImage2="https://i.ibb.co/ZcJxmcZ/supershy.webp"
          musicImage3="https://i.ibb.co/DGWrD6M/image.jpg"
          musicTitle1="Dynamite"
          musicTitle2="Super Shy"
          musicTitle3="불꽃놀이"
        />
        <GenreMusic
          genre="인디"
          bgColor={200}
          musicImage1="https://i.ibb.co/4d0pj5j/dynamite.webp"
          musicImage2="https://i.ibb.co/ZcJxmcZ/supershy.webp"
          musicImage3="https://i.ibb.co/DGWrD6M/image.jpg"
          musicTitle1="Dynamite"
          musicTitle2="Super Shy"
          musicTitle3="불꽃놀이"
        />
        <GenreMusic
          genre="발라드"
          bgColor={300}
          musicImage1="https://i.ibb.co/4d0pj5j/dynamite.webp"
          musicImage2="https://i.ibb.co/ZcJxmcZ/supershy.webp"
          musicImage3="https://i.ibb.co/DGWrD6M/image.jpg"
          musicTitle1="Dynamite"
          musicTitle2="Super Shy"
          musicTitle3="불꽃놀이"
        />
        <GenreMusic
          genre="힙합"
          bgColor={400}
          musicImage1="https://i.ibb.co/4d0pj5j/dynamite.webp"
          musicImage2="https://i.ibb.co/ZcJxmcZ/supershy.webp"
          musicImage3="https://i.ibb.co/DGWrD6M/image.jpg"
          musicTitle1="Dynamite"
          musicTitle2="Super Shy"
          musicTitle3="불꽃놀이"
        />
      </div>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </>
  );
}

export default GenreMusicComponent;
