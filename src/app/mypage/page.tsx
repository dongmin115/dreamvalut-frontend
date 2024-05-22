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
      <div className="flex h-screen w-screen flex-col bg-[#1a1a1a] pl-[15%]">
        <div className="flex h-fit w-full flex-row space-x-6 p-[2%]">
          {/* 내 계정 */}
          <div className="flex h-full w-[40%] flex-col">
            <h1 className="text-3xl text-[#D4D4D4]">내 계정</h1>
            <div className="flex h-2/3 w-full flex-row items-center justify-between space-x-4 rounded-xl bg-[#353535] p-[4%] shadow-md">
              <div className="flex h-full w-full flex-row space-x-8">
                <img
                  src={userInfoLoading ? 'loading' : userInfo.profile_image}
                  alt="프로필 이미지"
                  className="rounded-full object-cover drop-shadow-sm"
                />
                <div className="flex w-fit flex-col justify-center">
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full rounded-md bg-[#040404] bg-opacity-30 p-2 text-xl text-white focus:outline-none"
                      value={name}
                      size={1}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    <p className="text-xl text-white">
                      {userInfoLoading ? 'loading' : name}
                    </p>
                  )}

                  <p className="w-fit text-lg text-[#777777]">
                    {userInfoLoading ? 'loading' : userInfo.user_email}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 음악취향 */}
          <div className="flex h-full w-[60%] flex-col">
            <div className="flex h-fit flex-row justify-between">
              <h1 className="text-3xl text-[#D4D4D4]">나의 음악취향</h1>
              <Button
                variant="contained"
                color="primary"
                className="h-fit w-fit whitespace-nowrap rounded-xl bg-[#6C26FF] px-8 py-2 text-white"
                onClick={handleEdit}
              >
                <EditIcon color="secondary" fontSize="small" className="mr-2" />
                {isEditing ? '수정하기' : '프로필 수정'}
              </Button>
            </div>
            <div className="flex h-2/3 w-full items-center justify-center gap-2 rounded-xl bg-[#353535] object-center p-[2%] text-center shadow-md">
              {/* 장르 데이터를 Button 컴포넌트로 매핑하여 보여줍니다. */}
              <div className="w-full">
                {/* 장르 목록 */}
                <div className="flex w-full min-w-full">
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
                      className="flex-grow rounded-2xl"
                      onClick={() => handleGenreToggle(genre.genre_id)}
                    >
                      {genre.genre_name}
                    </Button>
                  ))}
                </div>

                {/* 페이지네이션 */}
                <div className="mt-4 flex justify-center">
                  <Button disabled={currentPage === 1} onClick={handlePrevPage}>
                    <ArrowBackIosIcon />
                  </Button>
                  <div className="my-auto">
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
        {/* 최근 감상한 곡 */}
        <div className="flex h-full w-full flex-col space-y-4 p-[2%]">
          <h1 className="mt-0 text-3xl text-[#D4D4D4]">최근 감상한 곡</h1>
          <div className="grid h-full w-full grid-cols-1 gap-4 rounded-xl bg-[#353535] p-[2%] shadow-md md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentListLoading ? (
              <div>로딩중...</div>
            ) : (
              recentList.content.map((e: any) => (
                <Link key={e.track_id} href={`/track/${e.track_id}`}>
                  <div className="flex h-auto w-auto flex-row items-center space-x-4 rounded-lg p-4 hover:bg-[#040404] hover:bg-opacity-30">
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
              <ArrowBackIosIcon />
            </Button>
            <span>
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
              <ArrowForwardIosIcon />
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
