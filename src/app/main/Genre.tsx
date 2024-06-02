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
  id,
  genre,
  bgColor,
  musicImage1,
  musicImage2,
  musicImage3,
  musicTitle1,
  musicTitle2,
  musicTitle3,
  id1,
  id2,
  id3,
}: GenreMusicProps) {
  const musicList = [
    { image: musicImage1, title: musicTitle1, id: id1 },
    { image: musicImage2, title: musicTitle2, id: id2 },
    { image: musicImage3, title: musicTitle3, id: id3 },
  ];

  return (
    <div className="m-4 flex w-56 flex-col items-center justify-center xl:w-72">
      {/* 위에 단색 배경바 */}
      <Link
        href={`/playlist/type=genre&id=${id}`}
        className={`flex h-12 w-full flex-row items-center rounded-t-xl p-4 xl:h-16 bg-nv-${bgColor}`}
      >
        <p className="text-md mx-4 w-full font-bold text-black">{genre}</p>
        <IconButton>
          <PlayCircleIcon style={{ fontSize: 30, opacity: 0.7 }} />
        </IconButton>
      </Link>

      {/* 음악 정보 */}
      <div
        className={`flex h-full w-full flex-col items-center justify-center rounded-b-xl p-1 bg-genre-${bgColor} mx-4`}
      >
        {/* 음악 정보 */}
        {musicList.map((music, index) => (
          <Link
            href={`/track/${music.id}`}
            key={index}
            className="hover-bg-opacity flex w-11/12 cursor-pointer flex-row items-center justify-start rounded-3xl p-1 hover:bg-opacity-90 xl:p-2"
          >
            <figure className="relative m-2 flex h-10 w-10 xl:h-14 xl:w-14">
              <Image
                src={music.image}
                alt="Music cover"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </figure>
            <p className="flex w-3/5 flex-wrap text-sm font-bold text-black">
              {music.title}
            </p>
          </Link>
        ))}
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
  }, [divRef.current]);

  const { isLoading, data } = useQuery({
    queryKey: ['Genre Data'],
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

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-zinc-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
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
              genre_id: number;
              genre_name: string;
              tracks: {
                thumbnail_image: string;
                title: string;
                track_id: number;
              }[];
            },
            index: number,
          ) => (
            <div className="flex h-72 w-64 xl:h-80 xl:w-72">
              <GenreMusic
                key={index}
                id={genreData.genre_id}
                genre={genreData.genre_name}
                bgColor={randomGenreColor[index]}
                musicImage1={genreData.tracks[0].thumbnail_image}
                musicImage2={genreData.tracks[1].thumbnail_image}
                musicImage3={genreData.tracks[2].thumbnail_image}
                musicTitle1={genreData.tracks[0].title}
                musicTitle2={genreData.tracks[1].title}
                musicTitle3={genreData.tracks[2].title}
                id1={genreData.tracks[0].track_id}
                id2={genreData.tracks[1].track_id}
                id3={genreData.tracks[2].track_id}
              />
            </div>
          ),
        )}
        <div ref={divRef} />
      </div>
      <div className="bg-zinc-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default Genre;
