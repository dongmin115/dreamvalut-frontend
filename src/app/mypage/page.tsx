/* eslint-disable no-unused-vars */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { EditfetchGenres, fetchGenres } from '@/api/genre.ts';
import { Genre } from '@/types/genre.ts';

const theme = createTheme({
  palette: {
    primary: {
      // 메인 컬러 보라색
      main: '#6C26FF',
    },
    secondary: {
      // 흰색
      main: '#ffffff',
    },
  },
});

export default function Mypage() {
  const recentSongs = [
    {
      title: 'title1',
      artist: 'artist1',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title2',
      artist: 'artist2',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title3',
      artist: 'artist3',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title4',
      artist: 'artist4',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title5',
      artist: 'artist5',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title6',
      artist: 'artist6',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title7',
      artist: 'artist7',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title8',
      artist: 'artist8',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title9',
      artist: 'artist9',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title10',
      artist: 'artist10',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title11',
      artist: 'artist11',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title12',
      artist: 'artist12',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title13',
      artist: 'artist13',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title13',
      artist: 'artist13',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title13',
      artist: 'artist13',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title13',
      artist: 'artist13',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
  ];

  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    EditfetchGenres()
      .then((res) => {
        setGenres(res); // 가져온 데이터를 상태에 설정
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });
  }, []);

  const handleGenreToggle = (genreId: number) => {
    // 장르를 토글하여 선택 상태를 변경
    const updatedGenres = genres.map((genre) =>
      genre.genre_id === genreId ? { ...genre, state: !genre.state } : genre,
    );
    setGenres(updatedGenres);
  };

  const itemsPerPage = 7; // 페이지당 아이템 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(genres.length / itemsPerPage);

  // 현재 페이지에 해당하는 장르만 선택하여 렌더링
  const visibleGenres = genres.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // // 페이지 변경 핸들러
  // const handlePageChange = (page: React.SetStateAction<number>) => {
  //   setCurrentPage(page);
  // };

  // 이전 페이지로 이동하는 핸들러
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // 다음 페이지로 이동하는 핸들러
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="w-screen h-screen pl-[15%] bg-[#1a1a1a] flex flex-col">
        <div className="flex flex-row w-full h-[30%] space-x-6 p-[2%]">
          {/* 내 계정 */}
          <div className="flex flex-col w-[40%] h-full space-y-4">
            <h1 className="text-[#D4D4D4] text-3xl">내 계정</h1>
            <div className="flex flex-row items-center space-x-4 bg-[#353535] w-full h-full rounded-xl p-[4%] justify-between shadow-md">
              <div className="flex flex-row space-x-8">
                <img
                  src="https://i.ibb.co/hLxvjJG/1.jpg"
                  alt="프로필 이미지"
                  className="size-28 rounded-full drop-shadow-sm"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-white text-xl">User name</p>
                  <p className="text-[#777777] text-lg">User email</p>
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                <EditIcon color="secondary" fontSize="small" className="mr-2" />
                프로필 수정
              </Button>
            </div>
          </div>
          {/* 음악취향 */}
          <div className="flex flex-col w-[60%] h-full space-y-4">
            <h1 className="text-[#D4D4D4] text-3xl">나의 음악취향</h1>
            <div className="flex flex-wrap items-center bg-[#353535] w-full h-full rounded-xl p-[2%] shadow-md justify-center gap-2 text-center object-center">
              <div>
                {/* 장르 데이터를 Button 컴포넌트로 매핑하여 보여줍니다. */}
                <div>
                  {/* 장르 목록 */}
                  <div className="flex">
                    {visibleGenres.map((genre) => (
                      <Button
                        key={genre.genre_id}
                        variant="contained"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${
                            genre.state ? '#6c26ff' : '#606060'
                          }, transparent)`,
                          borderRadius: '45%', // 모서리를 둥글게 조절
                          margin: '1%', // 버튼 간의 간격 조절
                        }}
                        color="primary"
                        onClick={() => handleGenreToggle(genre.genre_id)}
                      >
                        {genre.genre_name}
                      </Button>
                    ))}
                  </div>
                  {/* 페이지네이션 */}
                  <div className="flex justify-center mt-4">
                    <Button
                      disabled={currentPage === 1}
                      onClick={handlePrevPage}
                    >
                      <ArrowBackIosIcon />
                    </Button>
                    {/* <div>
                      {currentPage} / {totalPages}
                    </div> */}
                    <Button
                      disabled={currentPage === totalPages}
                      onClick={handleNextPage}
                    >
                      <ArrowForwardIosIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 최근 감상한 곡 */}
        <div className="flex flex-col w-full h-full p-[2%] space-y-4">
          <h1 className="text-[#D4D4D4] text-3xl">최근 감상한 곡</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-[#353535] w-full h-full rounded-xl p-[2%] shadow-md">
            {recentSongs.map((e, i) => (
              <div
                key={i}
                className="flex flex-row space-x-4 w-full h-fit hover:bg-[#040404] hover:bg-opacity-30 rounded-lg p-4"
              >
                <img
                  src={e.cover}
                  alt="음악 커버이미지"
                  className="w-16 h-16 rounded-md drop-shadow-lg items-center"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-white text-lg">{e.title}</p>
                  <p className="text-[#777777]">{e.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
