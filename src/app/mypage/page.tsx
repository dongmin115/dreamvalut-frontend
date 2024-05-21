/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
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
import { Genre, GenreData } from '@/types/genre.ts';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getRecentList } from '@/api/playlist.ts';
import getUser from '@/api/user.ts';

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
  const { data } = useQuery({
    queryKey: ['genres'],
    queryFn: EditfetchGenres,
  });

  const { data: recentList, isLoading: recentListLoading } = useQuery({
    queryKey: ['recentList'],
    queryFn: getRecentList,
  });

  const { data: userInfo, isLoading: userInfoLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const [genres, setGenres] = useState<Genre[]>([]);

  React.useEffect(() => {
    if (data) {
      setGenres(data);
    }
  }, [data]);

  const handleGenreToggle = (genreId: number) => {
    const updatedGenres = genres.map((genre) =>
      genre.genre_id === genreId ? { ...genre, state: !genre.state } : genre,
    );
    setGenres(updatedGenres);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const genresPerPage = 7;
  // 페이지 이동 버튼 핸들러
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(genres.length / genresPerPage);

  // 현재 페이지에 표시할 장르 가져오기
  const indexOfLastGenre = currentPage * genresPerPage;
  const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
  const currentGenres = genres.slice(indexOfFirstGenre, indexOfLastGenre);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen w-screen flex-col bg-[#1a1a1a] pl-[15%]">
        <div className="flex h-[30%] w-full flex-row space-x-6 p-[2%]">
          {/* 내 계정 */}
          <div className="flex h-full w-[40%] flex-col space-y-4">
            <h1 className="text-3xl text-[#D4D4D4]">내 계정</h1>
            <div className="flex h-full w-full flex-row items-center justify-between space-x-4 rounded-xl bg-[#353535] p-[4%] shadow-md">
              <div className="flex flex-row space-x-8">
                <img
                  src={userInfoLoading ? 'loading' : userInfo.profile_image}
                  alt="프로필 이미지"
                  className="size-28 rounded-full drop-shadow-sm"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-xl text-white">
                    {userInfoLoading ? 'loading' : userInfo.user_name}
                  </p>
                  <p className="text-lg text-[#777777]">
                    {userInfoLoading ? 'loading' : userInfo.user_email}
                  </p>
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
          <div className="flex h-full w-[60%] flex-col space-y-4">
            <h1 className="text-3xl text-[#D4D4D4]">나의 음악취향</h1>
            <div className="flex h-full w-full flex-wrap items-center justify-center gap-2 rounded-xl bg-[#353535] object-center p-[2%] text-center shadow-md">
              <div>
                {/* 장르 데이터를 Button 컴포넌트로 매핑하여 보여줍니다. */}
                <div>
                  {/* 장르 목록 */}
                  <div className="flex">
                    {currentGenres.map((genre) => (
                      <Button
                        key={genre.genre_id}
                        variant="contained"
                        style={{
                          backgroundColor: genre.state ? '#6c26ff' : '#606060',
                          margin: '1%',
                          borderRadius: '45%',
                        }}
                        onClick={() => handleGenreToggle(genre.genre_id)}
                      >
                        {genre.genre_name}
                      </Button>
                    ))}
                  </div>

                  {/* 페이지네이션 */}
                  <div className="mt-4 flex justify-center">
                    <Button
                      disabled={currentPage === 1}
                      onClick={handlePrevPage}
                    >
                      <ArrowBackIosIcon />
                    </Button>
                    <div>
                      {currentPage} / {totalPages}
                    </div>
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
        <div className="flex h-full w-full flex-col space-y-4 p-[2%]">
          <h1 className="text-3xl text-[#D4D4D4]">최근 감상한 곡</h1>
          <div className="grid h-full w-full grid-cols-1 gap-4 rounded-xl bg-[#353535] p-[2%] shadow-md md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentListLoading ? (
              <div>로딩중...</div>
            ) : (
              recentList.content.map((e: any) => (
                <div
                  key={e.track_id}
                  className="flex h-auto w-auto flex-row items-center space-x-4 rounded-lg p-4 hover:bg-[#040404] hover:bg-opacity-30"
                >
                  <img
                    src={e.track_image}
                    alt="음악 커버이미지"
                    className="my-auto h-24 w-24 items-center rounded-md drop-shadow-lg"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-lg text-white">{e.title}</p>
                    <p className="text-[#777777]">{e.uploader_name}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
