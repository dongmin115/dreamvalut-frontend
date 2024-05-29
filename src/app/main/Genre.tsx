/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useRef, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { ThemeProvider } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { getSlideContentStyle } from '@/app/styles/slide.ts';
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
    <div className="m-4 flex w-96 flex-col items-center justify-center">
      {/* 위에 단색 배경바 */}
      <Link
        href={`/genre/${bgColor / 100}`}
        className={`flex h-20 w-full flex-row items-center rounded-t-2xl p-4 bg-nv-${bgColor}`}
      >
        {/* <p className="text-md m-4 w-full font-bold text-black">{genre}</p>
        <IconButton>
          <PlayCircleIcon style={{ fontSize: 50, opacity: 0.7 }} />
        </IconButton> */}
      </Link>

      {/* 음악 정보 */}
      <div
        className={`flex h-full w-full flex-col items-center justify-center rounded-b-2xl bg-genre-${bgColor} mx-4`}
      >
        {/* 음악 정보 */}
        {/* {musicList.map((music, index) => (
          <div
            key={index}
            className="hover-bg-opacity flex h-16 w-11/12 cursor-pointer flex-row items-center justify-start rounded-3xl px-3 hover:bg-opacity-90"
          >
            <figure className="relative m-2 flex h-12 w-12">
              <Image
                src={music.image}
                alt="Music cover"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </figure>
            <p className="flex flex-wrap text-sm text-black">{music.title}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}

function Genre() {
  const [pageIndex, setPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const [randomGenreColor, setRandomGenreColor] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // 10% 가시성을 기준으로 설정
      },
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  const { isLoading, data } = useQuery({
    queryKey: ['Genre Data'], // pageIndex를 queryKey에 추가
    queryFn: fetchGenrePlaylist,
  });
  const handleForwardClick = () => {
    if (isVisible) {
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
  console.log('isVisible :', isVisible);
  return (
    <ThemeProvider theme={theme}>
      <div className="z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div
        className="flex h-full w-11/12 flex-row items-center justify-start"
        style={getSlideContentStyle(pageIndex, 3)}
      >
        {/* content[0] 배열 내용 */}
        {data.content.map(
          (
            genreData: {
              genre_name: string;
              tracks: { thumbnail_image: string; title: string }[];
            },
            index: number,
          ) => (
            <div className="flex h-96 w-80">
              <GenreMusic
                key={index}
                genre={genreData.genre_name}
                bgColor={randomGenreColor[index]}
                musicImage1={genreData.tracks[0].thumbnail_image}
                musicImage2={genreData.tracks[1].thumbnail_image}
                musicImage3={genreData.tracks[2].thumbnail_image}
                musicTitle1={genreData.tracks[0].title}
                musicTitle2={genreData.tracks[1].title}
                musicTitle3={genreData.tracks[2].title}
              />
            </div>
          ),
        )}
        {/* <GenreMusic
          genre={genreData.genre_name}
          bgColor={randomGenreColor[index]}
          musicImage1={genreData.tracks[0].thumbnail_image}
          musicImage2={genreData.tracks[1].thumbnail_image}
          musicImage3={genreData.tracks[2].thumbnail_image}
          musicTitle1={genreData.tracks[0].title}
          musicTitle2={genreData.tracks[1].title}
          musicTitle3={genreData.tracks[2].title}
        /> */}
        <div ref={divRef} className="h-2 w-2 bg-blue-200" />
      </div>
      <div className="z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default Genre;
