/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

'use client';

import React from 'react';
import numeral from 'numeral';
import { IconButton, ThemeProvider } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { createTheme } from '@mui/material/styles';
import NavigationBar from '../../components/NavBar/NavigationBar';
import MusicBar from '../../components/Musicbar/Musicbar';

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
type MusicElementProps = {
  image: string;
  title: string;
  like: number;
  isLiked: boolean;
};

function MusicElement({ image, title, like, isLiked }: MusicElementProps) {
  return (
    <div className="flex flex-row w-full items-center">
      <div className="flex flex-row w-full items-center px-12">
        <img src={image} alt="Album cover" className="h-24 w-24 rounded-lg" />
        <p className="flex mx-6 w-96 text-2xl">{title}</p>
      </div>
      <p className="flex mx-6 w-24 text-2xl">{like}</p>
      <IconButton className="mx-6">
        <PlayCircleIcon color="primary" style={{ fontSize: 50, opacity: 1 }} />
      </IconButton>
    </div>
  );
}

function page(props: any) {
  const playlistTitle = decodeURIComponent(props.params.playlistTitle);
  return (
    <ThemeProvider theme={theme}>
      <div className="w-full h-full flex flex-col justify-end items-end overflow-hidden">
        <NavigationBar />
        <MusicBar />
        {/* NavigationBar 제외 영역 */}
        <div className="w-10/12 h-full pr-8">
          {/* 플리 제목 및 플레이 아이콘 */}
          <div className="flex flex-row w-full justify-center items-center ">
            <h1 className="w-full text-start">{playlistTitle}</h1>
            <IconButton className="mx-8">
              <PlayCircleIcon
                color="primary"
                style={{ fontSize: 50, opacity: 1 }}
              />
            </IconButton>
          </div>
          {/* 플리 박스 */}
          <div className="flex flex-col items-center w-full h-80 p-8 bg-gray-650 rounded-2xl">
            <div className="flex flex-row w-full">
              <p className="flex w-full ml-20 text-2xl">곡 정보</p>
              <p className="flex mx-6 w-24 text-2xl">좋아요</p>
              <p className="flex mx-6 w-24 text-2xl">재생</p>
            </div>
            <hr className="w-full my-6 border-zinc-600" />
            {/* 음악 요소들 */}
            <MusicElement
              image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              title="곡 제목"
              like={100}
              isLiked={false}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default page;
