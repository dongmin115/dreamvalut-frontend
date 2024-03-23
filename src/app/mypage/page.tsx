/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import MusicBar from '../components/Musicbar/Musicbar';
import NavBar from '../components/NavBar/NavigationBar';

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
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <MusicBar />
      <div className="w-screen h-screen pl-[15%] bg-[#1a1a1a]">
        <div className="flex flex-col p-[2%] w-full h-full space-y-4">
          <h1 className="text-[#D4D4D4] text-3xl">내 계정</h1>
          <div className="flex flex-row items-center space-x-2 bg-[#353535] w-[45%] h-fit rounded-xl p-[2%] justify-between shadow-md">
            <div className="flex flex-row space-x-8">
              <img
                src="https://i.ibb.co/hLxvjJG/1.jpg"
                alt="프로필 이미지"
                className="size-28 rounded-full"
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
      </div>
    </ThemeProvider>
  );
}
