/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { ThemeProvider } from '@emotion/react';
import { useState, useRef, useEffect } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { getSlideContentStyle } from '@/app/styles/slide.ts';
import Swal from 'sweetalert2';

import {
  fetchMyPlaylistThumbnail,
  fetchLikePlaylistThumbnail,
  fetchAddPlaylist,
} from '../../api/playlist.ts';
import theme from '../styles/theme.ts';
import AlbumCoverUser from '../components/AlbumCover/AlbumCoverUser.tsx';

function MyPlaylistComponent() {
  const [pageIndex, setPageIndex] = useState(0);
  const [publicScope, setPublicScope] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [createPlayListModalOpen, setCreatePlayListModalOpen] = useState(false);
  const musicList = [];
  const divRef = useRef(null);

  const { isLoading, data: myPlaylistData } = useQuery({
    queryKey: ['myPlaylistThumbnail'],
    queryFn: fetchMyPlaylistThumbnail,
  });

  const { data: likePlaylistData } = useQuery({
    queryKey: ['likePlaylistThumbnail'],
    queryFn: fetchLikePlaylistThumbnail,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // 10% 가시성을 기준으로 설정
      },
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [divRef.current]);

  const handleForwardClick = () => {
    if (isVisible) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  if (myPlaylistData !== undefined) {
    // 데이터가 존재할 때만 PopularMusic 컴포넌트 생성
    for (let i = 0; i < myPlaylistData.content.length; i += 1) {
      if (myPlaylistData.content[i]) {
        // 데이터가 존재하는 경우에만 생성
        musicList.push(
          <div key={i}>
            <AlbumCoverUser
              image1={myPlaylistData.content[i].thumbnails[0]}
              image2={myPlaylistData.content[i].thumbnails[1]}
              image3={myPlaylistData.content[i].thumbnails[2]}
              title={myPlaylistData.content[i].playlist_name}
              id={myPlaylistData.content[i].playlist_id}
            />
          </div>,
        );
      }
    }
  }

  const handleCancelClick = () => {
    setCreatePlayListModalOpen(false);
    setPublicScope(false);
  };

  const handleAddPlaylist = () => {
    const playlistName = document.querySelector('input')?.value;
    if (playlistName) {
      fetchAddPlaylist(playlistName, publicScope);

      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'success',
        title: '플레이리스트 생성 완료',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
        html: `'${playlistName}'가 생성되었어요! 🎶`,
      });
      setCreatePlayListModalOpen(false);
      setPublicScope(false);
    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: '플레이리스트 생성 실패',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
        html: '플레이리스트 이름을 입력해주세요!',
      });
    }
  };

  const NewPlaylistModal = (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div
        className="fixed inset-0 h-screen w-screen bg-black opacity-90"
        onClick={() => {
          setCreatePlayListModalOpen(false);
        }}
      />
      <div className="z-50 flex h-3/5 w-4/5 min-w-96 flex-col rounded-2xl border-4 border-gray-400 bg-zinc-800 p-8 drop-shadow-md xl:w-2/3 2xl:w-3/5">
        <h1 className="flex h-1/6 items-center justify-start text-xl text-white xl:text-2xl 2xl:text-3xl">
          새로운 플레이리스트
        </h1>
        <div className="flex h-4/6 flex-col items-start justify-around">
          <input
            className="my-6 h-12 w-3/4 border-b border-gray-500 bg-zinc-800 p-4 text-base text-gray-100 focus:outline-none 2xl:text-lg"
            placeholder="플레이리스트 이름을 입력하세요"
          />
          <div className="flex w-full flex-col">
            <p className="my-3 text-sm text-zinc-600">공개 범위</p>
            <div className="flex w-full flex-row">
              <div
                className="flex min-w-20 cursor-pointer flex-row items-center border-b border-gray-500 px-4 text-base 2xl:text-lg"
                style={{ userSelect: 'none' }}
                onClick={() => setPublicScope(!publicScope)}
              >
                <p className="w-full">{publicScope ? 'Public' : 'Private'}</p>
                <IconButton>
                  {publicScope ? (
                    <LockOpenIcon color="primary" fontSize="large" />
                  ) : (
                    <LockIcon color="primary" fontSize="large" />
                  )}
                </IconButton>
              </div>
              {publicScope && (
                <div className="my-2 flex h-full items-center justify-center text-sm text-zinc-600">
                  ! 공개 범위를 Public으로 설정하면 모든 사람들이 회원님의
                  플레이리스트를 볼 수 있습니다.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex h-1/6 w-full flex-row items-end justify-end">
          <p
            className="hover-bg-opacity mx-4 flex w-32 cursor-pointer items-center justify-center p-4 font-bold text-white *:text-base hover:rounded-full xl:text-xl"
            onClick={() => handleCancelClick()}
          >
            취소
          </p>

          <p
            className="hover-bg-opacity mx-4 flex w-32 cursor-pointer items-center justify-center rounded-full bg-white p-4 text-base font-bold text-purple-700 hover:rounded-full xl:text-xl"
            onClick={() => handleAddPlaylist()}
          >
            확인
          </p>
        </div>
      </div>
    </div>
  );

  if (isLoading) return <div>Loading...</div>;
  return (
    <ThemeProvider theme={theme}>
      {/* 모달창 */}
      {createPlayListModalOpen && NewPlaylistModal}

      <div className="bg-zinc-650 z-30 flex h-full w-10 flex-row items-center justify-center">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>

      <div
        className={
          'slide-content flex h-full w-full flex-col flex-wrap items-start justify-center'
        }
        style={getSlideContentStyle(pageIndex, 3)}
      >
        {/* 플리 생성 버튼 */}
        <div
          className="hover-bg-big -mx-8 mt-12 flex w-56 cursor-pointer flex-col items-center justify-center xl:-mx-4 2xl:mt-8"
          onClick={() => setCreatePlayListModalOpen(true)}
        >
          <div className="z-30 flex h-32 w-32 items-center justify-center rounded-lg bg-zinc-500 xl:h-36 xl:w-36 2xl:h-40 2xl:w-40">
            <AddIcon color="primary" fontSize="large" />
          </div>
          <p className="mt-4 h-16 text-center text-base font-bold text-white xl:text-lg">
            플레이리스트 생성
          </p>
        </div>

        {/* 좋아요 누른 곡 버튼 */}
        <AlbumCoverUser
          image1="https://i.ibb.co/VQycV7k/like.png"
          image2={likePlaylistData.thumbnails[0]}
          image3={likePlaylistData.thumbnails[1]}
          title="좋아요 누른 곡"
          id={-1}
        />

        {/* 내가 생성한 플리 버튼 */}
        {musicList}
        <div ref={divRef} />
      </div>
      <div className="bg-zinc-650 z-30 flex h-full w-10 flex-row items-center justify-center">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default MyPlaylistComponent;
