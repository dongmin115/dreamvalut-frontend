/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */

'use client';

import React, { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
// import { fetchData } from 'next-auth/client/_utils';
import { fetchGenres, EditfetchGenres } from '../api/genre.ts';
import { GenreData } from '../types/genre.ts';

const GenrePage = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [genres, setGenres] = useState<GenreData[]>([]); // 변경: genres 상태 타입 수정
  const [retryCount, setRetryCount] = useState(0);

  const handleGenreToggle = (genre_id: number) => {
    // 변경: genre_id 타입 명시
    if (selectedGenres.includes(genre_id)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genre_id));
    } else {
      setSelectedGenres([...selectedGenres, genre_id]);
    }
  };

  useEffect(() => {
    // 장르 목록을 가져오는 함수
    const fetchGenres = async () => {
      try {
        const response = await axios.get('/api/v1/genres/list'); // 변경: Response 타입 지정
        if (response.data) {
          setGenres(response.data.data); // 장르 데이터 설정
        }
      } catch (error) {
        console.error('오류 발생:', error);
        if (retryCount < 5) {
          // 다섯 번 이하로 재시도
          setRetryCount(retryCount + 1); // 재시도 횟수 증가
        } else {
          throw new Error('API 호출이 여러 번 실패했습니다.');
        }
      }
    };
    fetchGenres(); // 장르 데이터 가져오기
  }, [retryCount]);

  // useEffect(() => {
  //   fetchGenres()
  //     .then((res) => {
  //       setGenres(res.data.data);
  //     })
  //     .catch((error) => {
  //       console.log('asdsa');
  //       console.error('err', error);
  //     });
  // }, []);

  const theme = createTheme({
    palette: {
      primary: {
        // 메인 컬러 보라색
        main: '#7b4ba7',
      },
      secondary: {
        // 흰색
        main: '#ffffff',
      },
    },
  });

  // 다음페이지 버튼
  const handleNextPage = async () => {
    try {
      // // 전달할 데이터 객체
      // const dataToSend = {
      //   selectedGenres,
      // };

      // // 데이터를 JSON 문자열로 변환하여 URL 매개변수로 전달
      // const dataString = encodeURIComponent(JSON.stringify(dataToSend));
      // window.location.href = `/main?data=${dataString}`;

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
      <Link href="/main">
        <button
          className="fixed right-0 bottom-0 genreBtns w-[8%] h-[12%]"
          onClick={handleNextPage}
        >
          <ArrowForwardIosIcon color="primary" fontSize="large" />
        </button>{' '}
      </Link>
      {/* 다음 페이지로 이동하는 버튼 */}
    </ThemeProvider>
  );
};

export default GenrePage;
