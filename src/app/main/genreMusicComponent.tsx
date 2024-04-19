/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { ThemeProvider } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { GenreMusicProps } from '../../types/genre.ts';
import theme from '../styles/theme.ts';
import { fetchGenrePlaylist } from '../../api/playlist.ts';

// 1부터 n까지의 정수를 포함하는 배열을 생성하는 함수
function rangeArray(n: number): number[] {
  return Array.from({ length: n }, (_, index) => index + 1);
}

// 배열을 랜덤하게 섞는 함수 (Fisher-Yates 알고리즘)
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
      className={`flex flex-col items-center w-[22%] h-[22rem] rounded-2xl bg-genre-${bgColor} my-12 m-4 mx-8`}
    >
      {/* 위에 단색 배경바 */}
      <div
        className={`flex flex-row items-center w-full h-20 p-8 rounded-t-2xl bg-nv-${bgColor}`}
      >
        <p className="w-11/12 text-lg text-black font-bold">{genre}</p>
        <IconButton>
          <PlayCircleIcon style={{ fontSize: 50, opacity: 0.7 }} />
        </IconButton>
      </div>

      {/* 음악 정보 */}
      {/* 1번째 음악 */}
      <div className="flex flex-row items-center justify-start m-2 cursor-pointer hover-bg-opacity">
        <img className="w-1/4 m-2" src={musicImage1} />
        <p className="text- text-black">{musicTitle1}</p>
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
  const [randomGenreColor, setRandomGenreColor] = useState<number[]>([]);
  const { isLoading, data } = useQuery({
    queryKey: ['Genre Data', pageIndex], // pageIndex를 queryKey에 추가
    queryFn: () => fetchGenrePlaylist(pageIndex),
  });
  const handleForwardClick = () => {
    if (data.pageable.page_size - 1 > pageIndex) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  useEffect(() => {
    const initialArray = rangeArray(15);
    const shuffledArray = shuffleArray(initialArray);
    const multipliedArray = shuffledArray.map((num) => num * 100);
    setRandomGenreColor(multipliedArray);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div className="w-10/12 h-full flex flex-row items-center justify-start">
        {/* content[0] 배열 내용 */}
        {data.content[0] && (
          <GenreMusic
            genre={data.content[0].genre_name}
            bgColor={randomGenreColor[pageIndex * 4]}
            musicImage1={data.content[0].tracks[0].thumbnail_image}
            musicImage2={data.content[0].tracks[1].thumbnail_image}
            musicImage3={data.content[0].tracks[2].thumbnail_image}
            musicTitle1={data.content[0].tracks[0].title}
            musicTitle2={data.content[0].tracks[1].title}
            musicTitle3={data.content[0].tracks[2].title}
          />
        )}
        {/* content[1] 배열 내용 */}
        {data.content[1] && (
          <GenreMusic
            genre={data.content[1].genre_name}
            bgColor={randomGenreColor[pageIndex * 4 + 1]}
            musicImage1={data.content[1].tracks[0].thumbnail_image}
            musicImage2={data.content[1].tracks[1].thumbnail_image}
            musicImage3={data.content[1].tracks[2].thumbnail_image}
            musicTitle1={data.content[1].tracks[0].title}
            musicTitle2={data.content[1].tracks[1].title}
            musicTitle3={data.content[1].tracks[2].title}
          />
        )}
        {/* content[2] 배열 내용 */}
        {data.content[2] && (
          <GenreMusic
            genre={data.content[2].genre_name}
            bgColor={randomGenreColor[pageIndex * 4 + 2]}
            musicImage1={data.content[2].tracks[0].thumbnail_image}
            musicImage2={data.content[2].tracks[1].thumbnail_image}
            musicImage3={data.content[2].tracks[2].thumbnail_image}
            musicTitle1={data.content[2].tracks[0].title}
            musicTitle2={data.content[2].tracks[1].title}
            musicTitle3={data.content[2].tracks[2].title}
          />
        )}
        {/* content[3] 배열 내용 */}
        {data.content[3] && (
          <GenreMusic
            genre={data.content[3].genre_name}
            bgColor={randomGenreColor[pageIndex * 4 + 3]}
            musicImage1={data.content[3].tracks[0].thumbnail_image}
            musicImage2={data.content[3].tracks[1].thumbnail_image}
            musicImage3={data.content[3].tracks[2].thumbnail_image}
            musicTitle1={data.content[3].tracks[0].title}
            musicTitle2={data.content[3].tracks[1].title}
            musicTitle3={data.content[3].tracks[2].title}
          />
        )}
      </div>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default GenreMusicComponent;
