/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import { ThemeProvider } from '@emotion/react';
import { IconButton, createTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
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

export default function SearchPage() {
  return (
    <ThemeProvider theme={theme}>
      <div className="h-fit min-h-screen bg-[#1a1a1a]">
        <NavBar />
        {/* NavBar 제외영역 */}
        <div className="pl-[15%] h-fit w-full">
          <div className="flex p-[3%] flex-col gap-8 w-full">
            <p className="text-xl w-fit">에스파에 대한 검색 결과입니다.</p>
            <div className="flex flex-col bg-[#353535] h-fit rounded-xl w-full p-[2%] gap-4">
              <div className="flex flex-row justify-around items-center h-fit">
                <p className="text-xl w-[60%] text-center">곡정보</p>
                <p className="text-lg w-[10%] text-center">제작자</p>
                <p className="text-lg w-[10%] text-center">좋아요</p>
                <p className="text-lg w-[10%] text-center">재생</p>
              </div>
              <Divider />
              {/* 검색 결과 리스트 */}
              <ul className="flex flex-col gap-8 h-fit">
                <li className="flex flex-row justify-around items-center h-fit">
                  {/* 앨범 커버, 곡 이름 + 태그, 프롬프트 내용 flexbox */}
                  <div className="flex flex-row justify-between items-center w-[60%] gap-8">
                    {/* 앨범 커버, 곡 이름 flexbox */}
                    <div className="flex flex-col justify-center items-center w-fit gap-4">
                      <img
                        src="https://i.ibb.co/hLxvjJG/1.jpg"
                        alt="cover"
                        className="size-28 rounded-sm"
                      />
                      <p className="text-lg">title</p>
                    </div>
                    {/* 태그, 프롬프트 내용 flexbox */}
                    <div className="flex flex-col justify-center items-center w-[80%] gap-2">
                      {/* 태그 flexbox */}
                      <div className="flex flex-row gap-2 self-start">
                        {/* 태그 */}
                        <div className="rounded-full bg-[#5419d4] p-2 text-xs w-fit">
                          #Jazz
                        </div>
                        <div className="rounded-full bg-[#5419d4] p-2 text-xs w-fit">
                          #Rock
                        </div>
                      </div>
                      {/* 프롬프트 내용 */}
                      <p className="text-md items-center w-full">
                        "Cyclone Silence" merges the ethereal qualities of
                        Ambient music with a more intense and forceful
                        atmosphere. This track weaves together swirling synths
                        and deep, pulsating beats, creating a soundscape that's
                        both aggressive and enveloping. It's a journey through a
                        storm of emotions, where the power of nature meets the
                        tranquility of ambient soundscapes
                      </p>
                    </div>
                  </div>
                  {/* 제작자 */}
                  <p className="text-lg w-[10%] text-center text-[#777777]">
                    aespa
                  </p>
                  {/* 좋아요 */}
                  <div className="flex flex-row justify-center gap-2 items-center w-[10%]">
                    <IconButton>
                      <FavoriteIcon color="primary" fontSize="medium" />
                    </IconButton>
                    <p className="text-lg w-fit text-center">1</p>
                  </div>
                  {/* 재생 */}
                  <div className="w-[10%] text-center">
                    <IconButton>
                      <PlayArrowIcon color="primary" fontSize="large" />
                    </IconButton>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
