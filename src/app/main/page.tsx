/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// eslint-disable-next-line @next/next/no-img-element

'use client';

import MusicBar from '../components/Musicbar/Musicbar';
import NavigationBar from '../components/NavigationBar';
import { Button, Divider, IconButton, Slider } from '@mui/material';
import AlbumCoverSystem from '../components/AlbumCover/AlbumCoverSystem';
import AlbumCoverUser from '../components/AlbumCover/AlbumCoverUser';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';

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

// 인기 음악 컴포넌트의 props
type PopularMusicProps = {
  ranking: number;
};

// 인기 음악 컴포넌트
function PopularMusic({ ranking }: PopularMusicProps) {
  return (
    <div className="flex flex-row justify-start items-center m-2">
      {/* 순위 */}
      <p className="w-16 text-right text-5xl mt-6 drop-shadow-text z-10 -mr-4">
        {ranking}
      </p>
      {/* 앨범 커버 */}
      <img
        className="w-16 h-16"
        src="https://i.ibb.co/k55YHSL/Perfect-Night.jpg"
      />

      {/* 음악 정보 */}
      <div className="flex flex-col justify-center ml-4">
        <p className="text-2xl z-10">Perfect Night</p>
        <p className="text-lg-text z-10 text-gray-500">DJ Quads</p>
      </div>
    </div>
  );
}

function page() {
  const popularMusicList = [];

  // 1부터 12까지의 PopularMusic 컴포넌트를 생성하여 배열에 추가
  for (let i = 1; i <= 12; i += 1) {
    popularMusicList.push(<PopularMusic key={i} ranking={i} />);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <NavigationBar />
        <MusicBar />
        {/* NavigationBar 제외 영역 */}
        <div className="w-10/12 h-full ml-64">
          <h1 className="">인기 차트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl">
            <IconButton>
              <BackIcon color="primary" fontSize="large" />
            </IconButton>
            <div className="w-11/12 h-full flex flex-col flex-wrap justify-center items-start">
              {popularMusicList}
            </div>
            <IconButton>
              <ForwardIcon color="primary" fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default page;
