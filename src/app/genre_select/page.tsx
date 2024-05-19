/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

'use client';

import { Suspense, useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { GenreData } from '@/types/genre.ts';
import { Cookies } from 'react-cookie';
import { useSearchParams } from 'next/navigation';
import { fetchGenres } from '../../api/genre.ts';
import { getCookie } from '../Cookies.tsx';

// interface ClientSearchParamSetterOptions {
//   scroll?: never;
//   replace?: never;
// }
// options: ClientSearchParamSetterOptions

const GenrePageContent = () => {
  const searchParams = useSearchParams();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [genres, setGenres] = useState<GenreData[]>([]); // 변경: genres 상태 타입 수정
  const cookies = new Cookies();

  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  cookies.set('accessToken', accessToken, { path: '/' });
  cookies.set('refreshToken', refreshToken, { path: '/' });

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
  useEffect(() => {
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
      const access_Token = await getCookie('accessToken');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/preference`,
        { genre_ids: selectedGenres },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_Token}`,
          },
        },
      );
    } catch (error) {
      console.error('Error navigating to next page:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup orientation="vertical" value={selectedGenres}>
        <div>
          <div className="flex h-screen w-screen items-center justify-center">
            <div className="z-10 grid h-screen w-[30%] grid-cols-3 grid-rows-5 gap-4 p-[1%]">
              {genres.map((genre) => (
                <div key={genre.genre_id} className="w-full">
                  <ToggleButton
                    value={genre.genre_id}
                    onClick={() => {
                      handleGenreToggle(genre.genre_id);
                    }}
                    className={`fade-in-box hover-bg-opacity flex h-full w-full flex-col text-center ${selectedGenres.includes(genre.genre_id) ? '#341672' : ''}`}
                    style={{
                      border: selectedGenres.includes(genre.genre_id)
                        ? '1px solid #8b5cf6'
                        : '1px solid #8b5cf6',
                      backgroundColor: selectedGenres.includes(genre.genre_id)
                        ? '#2e1065'
                        : '#1a1a1a',
                      borderRadius: '15%',
                    }}
                  >
                    <img
                      src={genre.genre_image}
                      alt="genre-thumbnail"
                      className="h-4/5 w-4/5 rounded-full"
                    />
                    <p className="mt-[15%] text-sm text-white">
                      {genre.genre_name}
                    </p>
                  </ToggleButton>
                </div>
              ))}
            </div>
          </div>
          <div className="fade-in-box2 absolute left-0 top-[45%] z-10 text-violet-900 opacity-[100%]">
            <p className="text-8xl">Genre.</p>
          </div>
          <div className="fade-in-box2 absolute bottom-[43%] left-[1%] z-0 h-[1%] w-[98%] rounded-md bg-violet-950 opacity-[100%]"></div>
        </div>
      </ToggleButtonGroup>
      {/* 다음 페이지로 이동하는 버튼 */}
      <Link href="/main">
        <button
          className="genreBtns fixed bottom-0 right-0 h-[12%] w-[8%]"
          onClick={handleNextPage}
        >
          <ArrowForwardIosIcon color="primary" fontSize="large" />
        </button>
      </Link>
    </ThemeProvider>
  );
};

// options: ClientSearchParamSetterOptions
const GenrePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <GenrePageContent {...options} /> */}
      <GenrePageContent />
    </Suspense>
  );
};

export default GenrePage;
