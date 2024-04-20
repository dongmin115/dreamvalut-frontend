/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */

'use client';

import React, { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
// import { fetchData } from 'next-auth/client/_utils';
import { GenreData } from '@/types/genre.ts';
import { useQuery } from '@tanstack/react-query';
import { EditfetchGenres, fetchGenres } from '../../api/genre.ts';

const GenrePage = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [genres, setGenres] = useState<GenreData[]>([]); // 변경: genres 상태 타입 수정

  const handleGenreToggle = (genre_id: number) => {
    // 변경: genre_id 타입 명시
    if (selectedGenres.includes(genre_id)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genre_id));
    } else {
      setSelectedGenres([...selectedGenres, genre_id]);
    }
  };

  const { data } = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
  });

  // 받아온 데이터 세팅
  React.useEffect(() => {
    if (data) {
      setGenres(data);
    }
  }, [data]);

  const theme = createTheme({
    palette: {
      primary: {
        // 메인 컬러 보라색
        main: '#6a1b9a',
      },
      secondary: {
        // 흰색
        main: '#ffffff',
      },
    },
  });

  // 다음페이지 버튼
  // 내 장르 취향 설정하기
  const handleNextPage = async () => {
    try {
      // API 호출
      await axios.post('/api/v1/users/preference', { genres: selectedGenres });
    } catch (error) {
      console.error('Error navigating to next page:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup orientation="vertical" value={selectedGenres}>
        <div>
          <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-[30%] h-screen grid z-10 grid-cols-3 grid-rows-4 gap-4 p-[1%]">
              {genres.map((genre) => (
                <div key={genre.genre_id} className="w-full">
                  <ToggleButton
                    value={genre.genre_id}
                    onClick={() => {
                      handleGenreToggle(genre.genre_id);
                      // fetchGenres(); // fetchGenres 호출
                    }}
                    className={`flex fade-in-box flex-col w-full h-full text-center hover-bg-opacity ${selectedGenres.includes(genre.genre_id) ? '#341672' : ''}`}
                    style={{
                      border: selectedGenres.includes(genre.genre_id)
                        ? '1px solid #8b5cf6'
                        : '1px solid #8b5cf6',
                      backgroundColor: selectedGenres.includes(genre.genre_id)
                        ? '#4c1d95'
                        : 'transparent',
                      borderRadius: '15%',
                    }}
                  >
                    <img
                      src={genre.genre_image}
                      alt="genre-thumbnail"
                      className="w-4/5 h-4/5 rounded-full"
                    />
                    <p className="text-white mt-[15%] text-sm">
                      {genre.genre_name}
                    </p>
                  </ToggleButton>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute z-10 fade-in-box2 left-0 top-[45%] text-violet-900 opacity-[100%]">
            <p className="text-8xl">Genre.</p>
          </div>
          <div className="absolute z-0 fade-in-box2 left-[1%] bottom-[43%] w-[98%] h-[1%] rounded-md bg-violet-950 opacity-[100%]"></div>
        </div>
      </ToggleButtonGroup>
      {/* 다음 페이지로 이동하는 버튼 */}
      <Link href="/main">
        <button
          className="fixed right-0 bottom-0 genreBtns w-[8%] h-[12%]"
          onClick={handleNextPage}
        >
          <ArrowForwardIosIcon color="primary" fontSize="large" />
        </button>{' '}
      </Link>
    </ThemeProvider>
  );
};

export default GenrePage;
