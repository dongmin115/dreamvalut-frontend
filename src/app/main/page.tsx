'use client';

import './genreColorList.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import PopularMusicComponent from './popularMusicComponent.tsx';
import PopularTagComponent from './popularTagComponent.tsx';
import GenreMusicComponent from './genreMusicComponent.tsx';
import OtherPeoplePlayListComponent from './otherPeoplePlayListComponent.tsx';
import SystemPlaylistComponent from './systemPlaylistComponent.tsx';

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
            <SystemPlaylistComponent />
          </div>
        </div>
        {/* 아래 여백, footer 넣을 예정 */}
        <div className="w-full h-40" />
      </div>
    </ThemeProvider>
  );
}

export default Page;
