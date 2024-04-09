/* eslint-disable import/order */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-console */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

'use client';

import { useState } from 'react';
import './GenreColorList.css';
import { IconButton } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AlbumCoverUser from '../components/AlbumCover/AlbumCoverUser';
import AlbumCoverSystem from '../components/AlbumCover/AlbumCoverSystem';
import PopularMusicComponent from './popularMusicComponent';
import PopularTagComponent from './popularTagComponent';

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

// 장르별 음악 컴포넌트의 props
type GenreMusicProps = {
  genre: string;
  bgColor: number;
  musicImage1: string;
  musicImage2: string;
  musicImage3: string;
  musicTitle1: string;
  musicTitle2: string;
  musicTitle3: string;
};
// 장르별 음악 컴포넌트
function GenreMusic({
  genre,
  bgColor,
  musicImage1,
  musicImage2,
  musicImage3,
  musicTitle1,
  musicTitle2,
  musicTitle3,
}: GenreMusicProps) {
  return (
    <div
      className={`flex flex-col items-center w-72 h-96 rounded-2xl bg-genre-${bgColor} my-12 m-4 mx-8`}
    >
      {/* 위에 단색 배경바 */}
      <div
        className={`flex flex-row items-center w-full h-20 p-8 rounded-t-2xl bg-nv-${bgColor}`}
      >
        <p className="w-11/12 text-2xl text-black font-bold">{genre}</p>
        <IconButton>
          <PlayCircleIcon style={{ fontSize: 50, opacity: 0.7 }} />
        </IconButton>
      </div>

      {/* 음악 정보 */}
      {/* 1번째 음악 */}
      <div className="flex flex-row items-center justify-start m-2 cursor-pointer hover-bg-opacity">
        <img className="w-1/4 m-2" src={musicImage1} />
        <p className="text-lg text-black">{musicTitle1}</p>
      </div>

      {/* 2번째 음악 */}
      <div className="flex flex-row items-center justify-start m-2 cursor-pointer hover-bg-opacity">
        <img className="w-1/4 m-2" src={musicImage2} />
        <p className="text-lg text-black">{musicTitle2}</p>
      </div>

      {/* 3번째 음악 */}
      <div className="flex flex-row items-center justify-start m-2 cursor-pointer hover-bg-opacity">
        <img className="w-1/4 m-2" src={musicImage3} />
        <p className="text-lg text-black">{musicTitle3}</p>
      </div>
    </div>
  );
}

// 메인 페이지 컴포넌트
function Page() {
  const [genrePageIndex, setgenrePageIndex] = useState(0); // 장르별 음악 페이지 인덱스
  const [otherPlaylistPageIndex, setOtherPlaylistPageIndex] = useState(0); // 다른 유저가 선택한 플레이리스트 페이지 인덱스
  const [systemPlaylistPageIndex, setSystemPlaylistPageIndex] = useState(0); // 시스템 플레이리스트 페이지 인덱스

  const handleGenrePageForwardClick = () => {
    setgenrePageIndex(genrePageIndex + 1);
  };

  const handleGenrePageBackwardClick = () => {
    if (genrePageIndex > 0) {
      setgenrePageIndex(genrePageIndex - 1);
    }
  };

  const handleOtherPlaylistPageForwardClick = () => {
    setOtherPlaylistPageIndex(otherPlaylistPageIndex + 1);
  };

  const handleOtherPlaylistPageBackwardClick = () => {
    if (otherPlaylistPageIndex > 0) {
      setOtherPlaylistPageIndex(otherPlaylistPageIndex - 1);
    }
  };

  const handleSystemPlaylistPageForwardClick = () => {
    setSystemPlaylistPageIndex(systemPlaylistPageIndex + 1);
  };

  const handleSystemPlaylistPageBackwardClick = () => {
    if (systemPlaylistPageIndex > 0) {
      setSystemPlaylistPageIndex(systemPlaylistPageIndex - 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full h-full flex flex-col justify-end items-end">
        {/* NavigationBar 제외 영역 */}
        <div className="w-10/12 h-full pr-8">
          {/* 인기 차트 */}
          <h1 className="">인기 차트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl overflow-hidden">
            <PopularMusicComponent />
          </div>

          {/* 인기 태그 */}
          <h1 className="">인기 태그</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl overflow-hidden">
            <PopularTagComponent />
          </div>

          {/* 장르별 음악 */}
          <h1 className="">장르별 음악</h1>
          <div className="flex flex-row justify-center items-center w-full h-auto bg-gray-650 rounded-2xl">
            <IconButton className="w-4" onClick={handleGenrePageBackwardClick}>
              {genrePageIndex !== 0 && (
                <BackIcon color="primary" fontSize="large" />
              )}
            </IconButton>
            <div className="w-11/12 h-full flex flex-row items-center justify-start">
              <GenreMusic
                genre="아이돌"
                bgColor={100}
                musicImage1="https://i.ibb.co/4d0pj5j/dynamite.webp"
                musicImage2="https://i.ibb.co/ZcJxmcZ/supershy.webp"
                musicImage3="https://i.ibb.co/DGWrD6M/image.jpg"
                musicTitle1="Dynamite"
                musicTitle2="Super Shy"
                musicTitle3="불꽃놀이"
              />
              <GenreMusic
                genre="인디"
                bgColor={200}
                musicImage1="https://i.ibb.co/4d0pj5j/dynamite.webp"
                musicImage2="https://i.ibb.co/ZcJxmcZ/supershy.webp"
                musicImage3="https://i.ibb.co/DGWrD6M/image.jpg"
                musicTitle1="Dynamite"
                musicTitle2="Super Shy"
                musicTitle3="불꽃놀이"
              />
              <GenreMusic
                genre="발라드"
                bgColor={300}
                musicImage1="https://i.ibb.co/4d0pj5j/dynamite.webp"
                musicImage2="https://i.ibb.co/ZcJxmcZ/supershy.webp"
                musicImage3="https://i.ibb.co/DGWrD6M/image.jpg"
                musicTitle1="Dynamite"
                musicTitle2="Super Shy"
                musicTitle3="불꽃놀이"
              />
              <GenreMusic
                genre="힙합"
                bgColor={400}
                musicImage1="https://i.ibb.co/4d0pj5j/dynamite.webp"
                musicImage2="https://i.ibb.co/ZcJxmcZ/supershy.webp"
                musicImage3="https://i.ibb.co/DGWrD6M/image.jpg"
                musicTitle1="Dynamite"
                musicTitle2="Super Shy"
                musicTitle3="불꽃놀이"
              />
            </div>
            <IconButton onClick={handleGenrePageForwardClick}>
              <ForwardIcon color="primary" fontSize="large" />
            </IconButton>
          </div>

          {/* 다른 유저가 선택한 플레이리스트 */}
          <h1 className="">다른 유저가 선택한 플레이리스트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl">
            <IconButton
              className="w-4"
              onClick={handleOtherPlaylistPageBackwardClick}
            >
              {otherPlaylistPageIndex !== 0 && (
                <BackIcon color="primary" fontSize="large" />
              )}
            </IconButton>
            <div className="w-11/12 h-full flex flex-row justify-start items-start">
              <AlbumCoverUser
                image1="https://i.ibb.co/HgFcPLj/getaguitar.webp"
                image2="https://i.ibb.co/TbQL5kz/thatthat.jpg"
                image3="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
                title="텐션 업!"
              />

              <AlbumCoverUser
                image1="https://i.ibb.co/HgFcPLj/getaguitar.webp"
                image2="https://i.ibb.co/TbQL5kz/thatthat.jpg"
                image3="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
                title="낭만 있는 플리"
              />

              <AlbumCoverUser
                image1="https://i.ibb.co/HgFcPLj/getaguitar.webp"
                image2="https://i.ibb.co/TbQL5kz/thatthat.jpg"
                image3="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
                title="올드 팝송"
              />

              <AlbumCoverUser
                image1="https://i.ibb.co/HgFcPLj/getaguitar.webp"
                image2="https://i.ibb.co/TbQL5kz/thatthat.jpg"
                image3="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
                title="나만 들으려고 저장한 노래"
              />
            </div>
            <IconButton onClick={handleOtherPlaylistPageForwardClick}>
              <ForwardIcon color="primary" fontSize="large" />
            </IconButton>
          </div>

          {/* 구독한 플레이리스트 */}
          <h1 className="">DreamVault가 제공하는 플레이리스트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl">
            <IconButton
              className="w-4"
              onClick={handleSystemPlaylistPageBackwardClick}
            >
              {systemPlaylistPageIndex !== 0 && (
                <BackIcon color="primary" fontSize="large" />
              )}
            </IconButton>
            <div className="w-11/12 h-full flex flex-row justify-start items-start">
              <AlbumCoverSystem
                image="https://i.ibb.co/ZVGLMxS/wecan-tbefriends.jpg"
                title="Billboard Hot 100"
              />
            </div>
            <IconButton onClick={handleSystemPlaylistPageForwardClick}>
              <ForwardIcon color="primary" fontSize="large" />
            </IconButton>
          </div>
        </div>
        {/* 아래 여백 */}
        <div className="w-full h-40" />
      </div>
    </ThemeProvider>
  );
}

export default Page;
