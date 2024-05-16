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
import Link from 'next/link';
import { GenreMusicProps } from '../../types/genre.ts';
import theme from '../styles/theme.ts';
import { fetchGenrePlaylist } from '../../api/playlist.ts';
import './GenreColorArr.css';

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
  const musicList = [
    { image: musicImage1, title: musicTitle1 },
    { image: musicImage2, title: musicTitle2 },
    { image: musicImage3, title: musicTitle3 },
  ];

  return (
    <div className="my-12 flex h-full w-72 flex-row items-center justify-center">
      <div
        className={`flex h-full w-full flex-col rounded-2xl bg-genre-${bgColor} mx-4`}
      >
        {/* 위에 단색 배경바 */}
        <Link
          href={`/genre/${bgColor / 100}`}
          className={`flex h-20 w-full flex-row items-center rounded-t-2xl p-6 bg-nv-${bgColor}`}
        >
          <p className="text-md w-10/12 font-bold text-black">{genre}</p>
          <IconButton>
            <PlayCircleIcon style={{ fontSize: 50, opacity: 0.7 }} />
          </IconButton>
        </Link>

        {/* 음악 정보 */}
        {musicList.map((music, index) => (
          <div
            key={index}
            className="hover-bg-opacity m-2 flex h-1/3 w-11/12 cursor-pointer flex-row items-center justify-start p-1 hover:bg-opacity-90"
          >
            <img
              className="m-2 w-1/3"
              src={music.image}
              alt={`Music ${index + 1}`}
            />
            <p className="text-md text-black">{music.title}</p>
          </div>
        ))}
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
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div className="flex h-full w-10/12 flex-row items-center justify-start py-8">
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
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default GenreMusicComponent;
