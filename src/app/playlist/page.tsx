/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

'use client';

import { IconButton, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import NavigationBar from '../components/NavBar/NavigationBar';
import MusicBar from '../components/Musicbar/Musicbar';
import AlbumCoverSystem from '../components/AlbumCover/AlbumCoverSystem';
import AlbumCoverUser from '../components/AlbumCover/AlbumCoverUser';

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

function page() {
  const [myPlaylistPage, setMyPlaylistPage] = useState(0);
  const [followingPlaylistPage, setFollowingPlaylistPage] = useState(0);
  const [systemPlaylistPage, setSystemPlaylistPage] = useState(0);

  const handleMyPlaylistPageBackwardClick = () => {
    if (myPlaylistPage > 0) {
      setMyPlaylistPage(myPlaylistPage - 1);
    }
  };

  const handleMyPlaylistPageForwardClick = () => {
    setMyPlaylistPage(myPlaylistPage + 1);
  };

  const handleFollowingPlaylistPageBackwardClick = () => {
    if (followingPlaylistPage > 0) {
      setFollowingPlaylistPage(followingPlaylistPage - 1);
    }
  };

  const handleFollowingPlaylistPageForwardClick = () => {
    setFollowingPlaylistPage(followingPlaylistPage + 1);
  };

  const handleSystemPlaylistPageBackwardClick = () => {
    if (systemPlaylistPage > 0) {
      setSystemPlaylistPage(systemPlaylistPage - 1);
    }
  };

  const handleSystemPlaylistPageForwardClick = () => {
    setSystemPlaylistPage(systemPlaylistPage + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full h-full flex flex-col justify-end items-end overflow-hidden">
        <NavigationBar />
        <MusicBar />
        {/* NavigationBar 제외 영역 */}
        <div className="w-10/12 h-full pr-8">
          {/* 내가 생성한 플레이리스트 */}
          <h1 className="">내가 생성한 플레이리스트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl">
            <IconButton
              className="w-4"
              onClick={handleMyPlaylistPageBackwardClick}
            >
              {myPlaylistPage !== 0 && (
                <BackIcon color="primary" fontSize="large" />
              )}
            </IconButton>

            <div className="w-11/12 h-full flex flex-row items-center justify-start">
              <div className="flex flex-col w-56 h-auto items-center justify-center m-4 mt-12 hover-bg-big cursor-pointer">
                <div className="flex h-48 w-48 justify-center items-center bg-zinc-500 rounded-lg">
                  <AddIcon color="primary" fontSize="large" />
                </div>
                <p className="text-lg text-white text-center mt-4">
                  플레이리스트 생성
                </p>
              </div>
              <AlbumCoverUser
                image1="https://i.ibb.co/HgFcPLj/getaguitar.webp"
                image2="https://i.ibb.co/TbQL5kz/thatthat.jpg"
                image3="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
                title="진우 플리"
              />
            </div>
            <IconButton onClick={handleMyPlaylistPageForwardClick}>
              <ForwardIcon color="primary" fontSize="large" />
            </IconButton>
          </div>

          {/* 팔로우한 플레이리스트 */}
          <h1 className="">팔로우한 플레이리스트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl">
            <IconButton
              className="w-4"
              onClick={handleFollowingPlaylistPageBackwardClick}
            >
              {followingPlaylistPage !== 0 && (
                <BackIcon color="primary" fontSize="large" />
              )}
            </IconButton>
            <div className="w-11/12 h-full flex flex-row items-center justify-start">
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
            <IconButton onClick={handleFollowingPlaylistPageForwardClick}>
              <ForwardIcon color="primary" fontSize="large" />
            </IconButton>
          </div>

          {/* 시스템 플레이리스트 */}
          <h1 className="">시스템 플레이리스트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl">
            <IconButton
              className="w-4"
              onClick={handleSystemPlaylistPageBackwardClick}
            >
              {systemPlaylistPage !== 0 && (
                <BackIcon color="primary" fontSize="large" />
              )}
            </IconButton>
            <div className="w-11/12 h-full flex flex-row items-center justify-start"></div>
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

export default page;
