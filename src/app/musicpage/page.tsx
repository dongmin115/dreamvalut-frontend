/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { IconButton, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ReplayIcon from '@mui/icons-material/Replay';
import MenuIcon from '@mui/icons-material/Menu';
import NavBar from '../components/NavigationBar';

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

export default function MusicPage() {
  return (
    <div className="w-screen h-screen">
      <NavBar />
      {/* 블러배경 */}
      <img
        src="https://i.ibb.co/hLxvjJG/1.jpg"
        alt="1"
        className="w-full h-full blur -z-10 fixed"
      />
      {/* 음악정보 */}
      <div className="flex flex-col items-center justify-center h-full w-[30%] ml-[20%] space-y-4">
        <h1 className="text-4xl text-white drop-shadow-lg">Lovin On Me</h1>
        <p className="text-[#777777] drop-shadow-md">Jack Harlow</p>
        <img
          src="https://i.ibb.co/hLxvjJG/1.jpg"
          alt="1"
          className="w-96 h-96 rounded-md drop-shadow-lg"
        />
        {/* 재생 컨트롤러 */}
        <div className="w-96">
          <ThemeProvider theme={theme}>
            <div className="flex flex-col items-center mt-6">
              <p className="text-white text-sm self-end">3:36</p>
              <Slider
                aria-label="Volume"
                // value={value}
                // onChange={handleChange}
                size="medium"
                color="secondary"
              />
            </div>
            <div className="flex justify-between">
              <IconButton>
                <MenuIcon color="secondary" fontSize="large" />
              </IconButton>
              <IconButton>
                <SkipPreviousIcon color="secondary" fontSize="large" />
              </IconButton>
              <IconButton>
                <PlayArrowIcon color="secondary" fontSize="large" />
              </IconButton>
              <IconButton>
                <SkipNextIcon color="secondary" fontSize="large" />
              </IconButton>
              <IconButton>
                <ReplayIcon color="secondary" fontSize="large" />
              </IconButton>
            </div>
          </ThemeProvider>
        </div>
      </div>
      {/* 재생목록 */}
    </div>
  );
}
