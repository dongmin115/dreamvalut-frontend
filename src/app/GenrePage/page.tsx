/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */

'use client';

import React, { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // React Router에서 임포트
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { fetchData } from 'next-auth/client/_utils';

interface Response {
  // API 응답을 정의하는 TypeScript 인터페이스입니다.
  data: Data[];
}

export interface Data {
  // 장르 데이터의 형식을 정의하는 TypeScript 인터페이스입니다.
  genre_id: number;
  genre_name: string;
  genre_image: string;
}
const GenrePage = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [genres, setGenres] = useState<Data[]>([]); // 변경: genres 상태 타입 수정
  const [loading, setLoading] = useState<boolean>(true); // 변경: loading 상태 타입 명시
  const [error, setError] = useState<any>(null); // 변경: error 상태 타입 명시
  const navigate = useNavigate(); // useNavigate 사용
  const fetchGenres = async () => {
    try {
      const response = await axios.get<Response>('/api/v1/genres/list'); // 변경: Response 타입 지정
      setGenres(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err); // 변경: 에러 처리 수정
      setLoading(false);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 장르 목록을 가져오는 fetchGenres 함수를 실행합니다. 의존성 배열이 비어 있으므로 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.
    const fetchData = () => {
      setTimeout(async () => {
        try {
          await fetchGenres(); // fetchGenres 함수가 완료될 때까지 대기합니다.
        } catch (err) {
          fetchData();
        }
      }, 100);
    };
    fetchData();
  }, []); // 변경: 의존성 배열 수정

  const handleGenreToggle = (genre_id: number) => {
    // 변경: genre_id 타입 명시
    if (selectedGenres.includes(genre_id)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genre_id));
    } else {
      setSelectedGenres([...selectedGenres, genre_id]);
    }
  };

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
      // 전달할 데이터 객체
      const dataToSend = {
        selectedGenres,
      };

      // 다음 페이지로 이동하면서 데이터 전송
      navigate('/main', { state: dataToSend });

      // async 함수이므로 비동기 작업을 await으로 처리
      // 여기서 로그인한 사용자의 데이터에 취향 장르를 업데이트하는 API 호출을 추가할 수 있습니다.
      await axios.post('/api/v1/users/preference', { genres: selectedGenres });
    } catch (error) {
      console.error('Error navigating to next page:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
                      fetchGenres(); // fetchGenres 호출
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
      <button
        className="fixed right-0 bottom-0 genreBtns w-[8%] h-[12%]"
        onClick={handleNextPage}
      >
        <ArrowForwardIosIcon color="primary" fontSize="large" />
      </button>{' '}
      {/* 다음 페이지로 이동하는 버튼 */}
    </ThemeProvider>
  );
};

export default GenrePage;
