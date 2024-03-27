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
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useEffect, useState } from 'react';
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
  const [createPlayListModalOpen, setCreatePlayListModalOpen] = useState(false);
  const [publicScope, setPublicScope] = useState(false);

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

  useEffect(() => {
    setPublicScope(false);
  }, [createPlayListModalOpen]);
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
              {/* 플리 생성 버튼 */}
              <div
                className="flex flex-col w-56 h-auto items-center justify-center m-4 mt-12 hover-bg-big cursor-pointer"
                onClick={() => setCreatePlayListModalOpen(true)}
              >
                <div className="flex h-48 w-48 justify-center items-center bg-zinc-500 rounded-lg">
                  <AddIcon color="primary" fontSize="large" />
                </div>
                <p className="text-lg text-white text-center mt-4">
                  플레이리스트 생성
                </p>
              </div>

              {/* 모달창 */}
              {createPlayListModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-40">
                  <div
                    className="fixed w-screen h-screen inset-0 bg-black opacity-90"
                    onClick={() => {
                      setCreatePlayListModalOpen(false);
                    }}
                  />
                  <div className="bg-zinc-800 p-8 w-3/5 h-3/5 flex flex-col z-50 rounded-2xl border-4 drop-shadow-md border-gray-400">
                    <h1 className="text-4xl mt-16 text-white">
                      새로운 플레이리스트
                    </h1>
                    <input
                      className="w-3/4 h-12 text-xl bg-zinc-800 my-24 p-4 text-gray-100 border-b border-gray-500 focus:outline-none"
                      placeholder="플레이리스트 이름을 입력하세요"
                    />
                    <p className="text-sm text-zinc-600 my-6">공개 범위</p>
                    <div
                      className="flex flex-row items-center w-1/5 text-xl border-b border-gray-500 px-4 cursor-pointer"
                      style={{ userSelect: 'none' }}
                      onClick={() => setPublicScope(!publicScope)}
                    >
                      <div className="w-full">
                        {publicScope ? 'Public' : 'Private'}
                      </div>
                      <IconButton>
                        {publicScope ? (
                          <LockOpenIcon color="primary" fontSize="large" />
                        ) : (
                          <LockIcon color="primary" fontSize="large" />
                        )}
                      </IconButton>
                    </div>
                    {publicScope && (
                      <div className="text-sm text-zinc-600 my-6">
                        ! 공개 범위를 Public으로 설정하면 모든 사람들이 회원님의
                        플레이리스트를 볼 수 있습니다.
                      </div>
                    )}
                    <div className="flex flex-row justify-end items-end w-full h-full">
                      <p
                        className="flex text-xl w-32 h-16 font-bold  justify-center items-center text-white m-4 cursor-pointer hover-bg-opacity hover:rounded-full"
                        onClick={() => setCreatePlayListModalOpen(false)}
                      >
                        취소
                      </p>

                      <p
                        className="flex text-xl w-32 h-16 font-bold rounded-full justify-center items-center bg-white text-purple-700 m-4 cursor-pointer hover-bg-opacity hover:rounded-full"
                        onClick={() => setCreatePlayListModalOpen(false)}
                      >
                        확인
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 좋아요 누른 곡 버튼 */}
              <AlbumCoverUser
                image1="https://i.ibb.co/VQycV7k/like.png"
                image2="https://i.ibb.co/HgFcPLj/getaguitar.webp"
                image3="https://i.ibb.co/TbQL5kz/thatthat.jpg"
                title="좋아요 누른 곡"
              />

              {/* 내가 생성한 플리 버튼 */}
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
          <h1 className="">구독한 플레이리스트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl">
            <IconButton
              className="w-4"
              onClick={handleSystemPlaylistPageBackwardClick}
            >
              {systemPlaylistPage !== 0 && (
                <BackIcon color="primary" fontSize="large" />
              )}
            </IconButton>
            <div className="w-11/12 h-full flex flex-row items-center justify-start">
              <AlbumCoverSystem
                image="https://i.ibb.co/ZVGLMxS/wecan-tbefriends.jpg"
                title="Billboard Hot 100"
              />

              <AlbumCoverSystem
                image="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
                title="가사 AI 노래 Top 100"
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
