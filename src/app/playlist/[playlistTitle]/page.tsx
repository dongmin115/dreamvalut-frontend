/* eslint-disable operator-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
/* eslint-disable @next/next/no-img-element */
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
  const formattedLike =
    like > 999 ? numeral(like).format('0.0a') : numeral(like).format('0a');
  return (
    <div className="flex flex-row w-full justify-start py-4 items-center hover-bg-opacity">
      <div className="flex flex-row w-full px-12 items-center">
        <img src={image} alt="Album cover" className="h-24 w-24 rounded-lg" />
        <p className="flex mx-6 text-2xl">{title}</p>
      </div>
      <div className="flex w-2/12 text-2xl justify-center items-center">
        <IconButton>
          {isLiked ? (
            <FavoriteIcon color="primary" fontSize="inherit" />
          ) : (
            <FavoriteBorderIcon color="primary" />
          )}
        </IconButton>

        {formattedLike}
      </div>
      <div className="flex w-24 justify-center items-center">
        <IconButton>
          <PlayCircleIcon
            color="primary"
            style={{ fontSize: 50, opacity: 1 }}
          />
        </IconButton>
      </div>
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
            <IconButton className="mx-28">
              <PlayCircleIcon
                color="primary"
                style={{ fontSize: 60, opacity: 1 }}
              />
            </IconButton>
          </div>
          {/* 플리 박스 */}
          <div className="flex flex-col items-center w-full h-auto p-8 bg-gray-650 rounded-2xl">
            <div className="flex flex-row w-full">
              <p className="flex w-full text-2xl px-20"> 곡 정보</p>
              <p className="flex w-2/12 text-2xl justify-center items-center">
                좋아요
              </p>
              <p className="flex w-24 text-2xl justify-center ">재생</p>
            </div>
            <hr className="w-full my-6 border-zinc-600" />
            {/* 음악 요소들 */}
            <MusicElement
              image="https://i.ibb.co/L0GHzbR/202402211005009.jpg"
              title="Shopper"
              like={1234123}
              isLiked={true}
            />
            <MusicElement
              image="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
              title="삐딱하게"
              like={511234}
              isLiked={true}
            />
            <MusicElement
              image="https://i.ibb.co/DGWrD6M/image.jpg"
              title="불꽃놀이"
              like={1534}
              isLiked={false}
            />
            <MusicElement
              image="https://i.ibb.co/4d0pj5j/dynamite.webp"
              title="Dynamite"
              like={34}
              isLiked={false}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default page;
