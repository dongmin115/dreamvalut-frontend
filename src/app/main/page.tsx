'use client';

import { useState } from 'react';
import './GenreColorList.css';
import { IconButton } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';

import AlbumCoverSystem from '../components/AlbumCover/AlbumCoverSystem.tsx';
import PopularMusicComponent from './popularMusicComponent.tsx';
import PopularTagComponent from './popularTagComponent.tsx';
import GenreMusicComponent from './genreMusicComponent.tsx';
import OtherPeoplePlayListComponent from './otherPeoplePlayListComponent.tsx';

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

// 메인 페이지 컴포넌트
function Page() {
  const [systemPlaylistPageIndex, setSystemPlaylistPageIndex] = useState(0); // 시스템 플레이리스트 페이지 인덱스

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
            <GenreMusicComponent />
          </div>

          {/* 다른 유저가 선택한 플레이리스트 */}
          <h1 className="">다른 유저가 선택한 플레이리스트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl">
            <OtherPeoplePlayListComponent />
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
