/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getUserGenres, patchUser } from '@/api/genre.ts';
import { Genre } from '@/types/genre.ts';
import { useQuery } from '@tanstack/react-query';
import { getRecentList } from '@/api/playlist.ts';
import getUser from '@/api/user.ts';
import Link from 'next/link';

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
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState<string>('');

  const { data: userInfo, isLoading: userInfoLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(setName),
  });

  const { data: genreData } = useQuery({
    queryKey: ['genres'],
    queryFn: () => getUserGenres(setGenres, setSelectedGenreIds),
  });

  const [recentListPage, setRecentListPage] = useState(1);
  const renderSize = 12;
  const totalRecentListPages = 5;

  const { data: recentList, isLoading: recentListLoading } = useQuery({
    queryKey: ['recentList', recentListPage],
    queryFn: () => getRecentList(recentListPage - 1, renderSize),
  });

  const handleGenreToggle = (genreId: number) => {
    const updatedGenres = genres.map((genre) =>
      genre.genre_id === genreId ? { ...genre, state: !genre.state } : genre,
    );
    setGenres(updatedGenres);

    // 선택된 장르 ID 업데이트
    setSelectedGenreIds(
      (prevIds) =>
        prevIds.includes(genreId)
          ? prevIds.filter((id) => id !== genreId) // 이미 선택된 경우 제거
          : [...prevIds, genreId], // 새로 선택된 경우 추가
    );
  };

  const patchProfile = async () => {
    await patchUser(name, selectedGenreIds);
  };

  const handleEdit = async () => {
    if (isEditing) {
      await patchProfile();
    }
    setIsEditing(!isEditing);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const genresPerPage = 5;
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
      <div className="flex h-screen w-full flex-col bg-[#1a1a1a]">
        <div className="flex h-fit w-full flex-row space-x-6 p-[2%]">
          {/* 내 계정 */}
          <div className="flex h-full w-[40%] flex-col space-y-2">
            <h1 className="text-xs text-[#D4D4D4] md:text-[20px] lg:text-xl xl:text-3xl">
              내 계정
            </h1>
            <div className="flex h-2/3 w-full flex-row items-center justify-between space-x-4 overflow-x-auto rounded-xl bg-[#353535] p-[4%] shadow-md">
              <div className="flex h-full w-full flex-row items-center justify-center space-x-4 space-y-2 sm:items-center sm:justify-center md:items-center md:justify-start md:space-x-8 lg:items-start lg:justify-start lg:space-x-8 lg:space-y-2 xl:items-start xl:justify-start xl:space-x-12 xl:space-y-2 2xl:items-start 2xl:justify-start 2xl:space-x-12 2xl:space-y-2">
                <img
                  src={userInfoLoading ? 'loading' : userInfo.profile_image}
                  alt="프로필 이미지"
                  className="h-20 w-20 rounded-full object-cover drop-shadow-sm md:h-20 md:w-20 lg:h-20 lg:w-20 xl:h-20 xl:w-20 2xl:h-20 2xl:w-20"
                />
                <div className="flex w-fit flex-col justify-center">
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full min-w-20 rounded-md bg-[#040404] bg-opacity-30 p-2 text-xl text-white focus:outline-none"
                      value={name}
                      size={1}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    <p className="w-fit text-xl text-white sm:text-xl md:flex md:text-[15px] lg:text-[17px] xl:text-xl 2xl:text-xl">
                      {userInfoLoading ? 'loading' : name}
                    </p>
                  )}

                  <p className="hidden w-fit text-[11px] text-[#777777] md:block md:text-[11px] lg:text-[14px] xl:text-xl 2xl:text-xl">
                    {userInfoLoading ? 'loading' : userInfo.user_email}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 음악취향 */}
          <div className="flex h-full w-[60%] flex-col space-y-2">
            <div className="flex h-fit flex-row justify-between">
              <h1 className="text-xs text-[#D4D4D4] md:text-[20px] lg:text-xl xl:text-3xl">
                나의 음악취향
              </h1>
              <Button
                variant="contained"
                color="primary"
                className="h-3 w-2 whitespace-nowrap rounded-xl bg-[#6C26FF] p-2 px-8 py-2 text-[7px] text-white sm:h-3 sm:w-[5rem] sm:text-[10px] md:h-5 md:w-[7rem] md:text-[14px] lg:h-7 lg:w-[10rem] lg:text-base xl:w-fit 2xl:w-fit"
                onClick={handleEdit}
              >
                <EditIcon
                  color="secondary"
                  className="mr-2 w-[10px] sm:w-3 md:w-[1rem] lg:w-[2rem]"
                />
                {isEditing ? '수정하기' : '프로필 수정'}
              </Button>
            </div>
            <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#353535] object-center p-[2%] text-center shadow-md md:h-auto lg:h-2/3 xl:h-2/3 2xl:h-2/3 ">
              {/* 장르 데이터를 Button 컴포넌트로 매핑하여 보여줍니다. */}
              <div className="w-full">
                {/* 장르 목록 */}
                <div className="inline-block w-10 min-w-full md:w-full lg:w-full xl:w-full 2xl:w-full">
                  {currentGenres.map((genre) => (
                    <Button
                      key={genre.genre_id}
                      variant="contained"
                      style={{
                        backgroundColor: genre.state ? '#6c26ff' : '#606060',
                        margin: '1%',
                        whiteSpace: 'nowrap', // 텍스트가 버튼 밖으로 넘치지 않도록 줄바꿈 방지
                        overflow: 'hidden', // 넘치는 텍스트 숨김
                        textOverflow: 'ellipsis', // 넘치는 텍스트를 "..."로 표시
                      }}
                      className="w-24 flex-grow rounded-2xl"
                      onClick={() => handleGenreToggle(genre.genre_id)}
                    >
                      {genre.genre_name}
                    </Button>
                  ))}
                </div>

                {/* 페이지네이션 */}
                <div className="mt-4 flex justify-center">
                  <Button disabled={currentPage === 1} onClick={handlePrevPage}>
                    <ArrowBackIosIcon className="w-5 sm:w-5 md:w-7 lg:w-10" />
                  </Button>
                  <div className="my-auto text-xs sm:text-xs md:text-sm lg:text-base xl:text-base">
                    {currentPage} / {totalPages}
                  </div>
                  <Button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    <ArrowForwardIosIcon className="w-5 sm:w-5 md:w-7 lg:w-10" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 최근 감상한 곡 */}
        <div className="flex h-full w-full flex-col space-y-2 p-[2%]">
          <h1 className="mt-0 text-sm text-[#D4D4D4] md:text-[20px] lg:text-xl xl:text-3xl">
            최근 감상한 곡
          </h1>
          <div className="grid h-full w-full grid-cols-1 gap-4 rounded-xl bg-[#353535] p-[2%] shadow-md md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentListLoading ? (
              <div>로딩중...</div>
            ) : (
              recentList.content.map((e: any) => (
                <Link key={e.track_id} href={`/track/${e.track_id}`}>
                  <div className="flex h-auto w-auto flex-row items-center space-x-4 rounded-lg p-4 transition-colors duration-300 ease-in hover:bg-[#040404] hover:bg-opacity-30">
                    <img
                      src={e.track_image}
                      alt="음악 커버이미지"
                      className="my-auto h-10 w-10 items-center rounded-md drop-shadow-lg md:h-16 md:w-16 lg:h-16 lg:w-16 xl:h-16 xl:w-16 2xl:h-20 2xl:w-20"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="text-base text-white md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl">
                        {e.title}
                      </p>
                      <p className="text-sm text-[#777777] lg:text-base xl:text-base 2xl:text-xl">
                        {e.uploader_name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="pagination  w-full items-center text-center">
            <Button
              // 페이지가 1보다 작아지지 않도록
              onClick={() => setRecentListPage((prev) => Math.max(prev - 1, 1))}
              disabled={recentListPage === 1}
            >
              <ArrowBackIosIcon className="w-5 sm:w-5 md:w-7 lg:w-10" />
            </Button>
            <span className="my-auto text-xs sm:text-xs md:text-sm lg:text-base xl:text-base">
              {recentListPage} / {totalRecentListPages}
            </span>
            <Button
              // 페이지가 최대 페이지를 넘어가지 않도록
              onClick={() =>
                setRecentListPage((prev) =>
                  totalRecentListPages
                    ? Math.min(prev + 1, totalRecentListPages)
                    : prev,
                )
              }
              disabled={
                recentListPage === totalRecentListPages || !totalRecentListPages
              }
            >
              <ArrowForwardIosIcon className="w-5 sm:w-5 md:w-7 lg:w-10" />
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
