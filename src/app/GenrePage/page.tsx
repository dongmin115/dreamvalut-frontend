/* eslint-disable no-shadow */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */

'use client';

import React, { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
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
const GridComponent = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [genres, setGenres] = useState<Data[]>([]); // 변경: genres 상태 타입 수정
  const [loading, setLoading] = useState<boolean>(true); // 변경: loading 상태 타입 명시
  const [error, setError] = useState<any>(null); // 변경: error 상태 타입 명시
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <ToggleButtonGroup orientation="vertical" value={selectedGenres}>
        <div>
          <div className="w-screen h-screen flex justify-center items-center">
            <div className="grid grid-cols-3 grid-rows-4 gap-8 p-[1%]">
              {genres.map((genre) => (
                <div key={genre.genre_id} className="w-full">
                  <ToggleButton
                    value={genre.genre_id}
                    onClick={() => {
                      handleGenreToggle(genre.genre_id);
                      fetchGenres(); // fetchGenres 호출
                    }}
                    className={`flex flex-col w-full text-center ${selectedGenres.includes(genre.genre_id) ? 'bg-purple-950' : ''}`}
                    style={{
                      border: selectedGenres.includes(genre.genre_id)
                        ? '3px solid #8b5cf6'
                        : '3px solid #8b5cf6',
                      backgroundColor: selectedGenres.includes(genre.genre_id)
                        ? '#8b5cf6'
                        : 'transparent',
                      borderRadius: '20%',
                      paddingTop: '10%', // 상단 여백 추가
                      paddingBottom: '10%', // 하단 여백 추가
                    }}
                  >
                    <img
                      src={genre.genre_image}
                      alt="genre-thumbnail"
                      className="w-4/5 h-4/5 rounded-full"
                    />
                    <p className="text-white mt-[15%] text-3xl">
                      {genre.genre_name}
                    </p>
                  </ToggleButton>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute z-10 fade-in-box2 left-0 top-[47%] text-violet-900 opacity-[100%]">
            <p className="text-9xl">Genre.</p>
          </div>
          <div className="absolute z-10 fade-in-box2 left-[1%] bottom-[44%] w-[98%] h-[1%] rounded-md bg-violet-950 opacity-[100%]"></div>
        </div>
      </ToggleButtonGroup>
    </>
  );
};

export default GridComponent;
