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

import { useEffect, useState } from 'react';
import axios from 'axios';
import './GenreColorList.css';
import { getSlideContentStyle } from '../styles/SlideStyles';
import { IconButton } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AlbumCoverUser from '../components/AlbumCover/AlbumCoverUser';
import AlbumCoverSystem from '../components/AlbumCover/AlbumCoverSystem';
import NavigationBar from '../components/NavBar/NavigationBar';
import MusicBar from '../components/Musicbar/Musicbar';

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
  title: string;
  thumnailImage: string;
};
// 인기 음악 컴포넌트
function PopularMusic({ ranking, title, thumnailImage }: PopularMusicProps) {
  return (
    <div className="w-[24%] h-1/4 flex flex-row justify-start items-center m-2 cursor-pointer hover-bg-opacity">
      {/* 순위 */}
      <p className="w-16 text-right text-4xl mt-6 drop-shadow-text z-10 -mr-4">
        {ranking}
      </p>
      {/* 앨범 커버 */}
      <img className="w-16" src={thumnailImage} />

      {/* 음악 정보 */}
      <div className="flex flex-col justify-center ml-4">
        <p className="text-xl w-full z-10">{title}</p>
      </div>
    </div>
  );
}

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
function page() {
  const [popularPageIndex, setpopularPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const [tagPageIndex, settagPageIndex] = useState(0); // 인기 태그 페이지 인덱스
  const [genrePageIndex, setgenrePageIndex] = useState(0); // 장르별 음악 페이지 인덱스
  const [otherPlaylistPageIndex, setOtherPlaylistPageIndex] = useState(0); // 다른 유저가 선택한 플레이리스트 페이지 인덱스
  const [systemPlaylistPageIndex, setSystemPlaylistPageIndex] = useState(0); // 시스템 플레이리스트 페이지 인덱스
  const [data, setData] = useState<any>({});

  const handlePopularPageForwardClick = () => {
    if (Math.ceil(data.length / 3) - 4 > popularPageIndex) {
      setpopularPageIndex(popularPageIndex + 1);
    } // 이때 4는 한번에 보여지는 인기음악의 개수
  };

  const handlePopularPageBackwardClick = () => {
    if (popularPageIndex > 0) {
      setpopularPageIndex(popularPageIndex - 1);
    }
  };

  const handleTagPageForwardClick = () => {
    settagPageIndex(tagPageIndex + 1);
  };

  const handleTagPageBackwardClick = () => {
    if (tagPageIndex > 0) {
      settagPageIndex(tagPageIndex - 1);
    }
  };

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
  const popularMusicList = [];

  const fetchChartData = async () => {
    try {
      const response = await axios.get('/api/v1/charts');
      setData(response.data.data.tracks);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      try {
        fetchChartData();
      } catch (error) {
        fetchChartData();
      }
    }, 500);
  }, []);

  // wldnjdiehla
  useEffect(() => {
    if (data.length > 0) {
      console.log(data.length); // 데이터가 로드된 후에만 track_id에 접근
    }
  }, [data, popularPageIndex]);

  if (data.length > 0) {
    // 데이터가 존재할 때만 PopularMusic 컴포넌트 생성
    for (let i = 0; i < 30; i += 1) {
      if (data[i]) {
        // 데이터가 존재하는 경우에만 생성
        popularMusicList.push(
          <PopularMusic
            key={i}
            ranking={i + 1}
            title={data[i].title}
            thumnailImage={data[i].thumbnail_image}
          />,
        );
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full h-full flex flex-col justify-end items-end">
        <NavigationBar />
        <MusicBar />
        {/* NavigationBar 제외 영역 */}
        <div className="w-10/12 h-full pr-8">
          {/* 인기 차트 */}
          <h1 className="">인기 차트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl overflow-hidden">
            <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
              <IconButton onClick={handlePopularPageBackwardClick}>
                {popularPageIndex !== 0 && (
                  <BackIcon color="primary" fontSize="large" />
                )}
              </IconButton>
            </div>
            <div
              className={
                'w-5/6 h-full flex flex-col flex-wrap justify-center items-start slide-content'
              }
              style={getSlideContentStyle(popularPageIndex)}
            >
              {popularMusicList}
            </div>
            <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
              <IconButton onClick={handlePopularPageForwardClick}>
                <ForwardIcon color="primary" fontSize="large" />
              </IconButton>
            </div>
          </div>

          {/* 인기 태그 */}
          <h1 className="">인기 태그</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl">
            <IconButton className="w-4" onClick={handleTagPageBackwardClick}>
              {tagPageIndex !== 0 && (
                <BackIcon color="primary" fontSize="large" />
              )}
            </IconButton>
            <div className="w-11/12 h-full flex flex-row items-center justify-start">
              <AlbumCoverSystem
                image="https://i.ibb.co/k55YHSL/Perfect-Night.jpg"
                title="신나는"
              />
            </div>
            <IconButton onClick={handleTagPageForwardClick}>
              <ForwardIcon color="primary" fontSize="large" />
            </IconButton>
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

export default page;
