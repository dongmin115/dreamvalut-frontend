'use client';

import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { getSlideContentStyle } from '@/app/styles/slide.ts';
import Swal from 'sweetalert2';
import Link from 'next/link';
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
  const [createPlayListModalOpen, setCreatePlayListModalOpen] = useState(false);
  const musicList = [];

  const { isLoading, data: myPlaylistData } = useQuery({
    queryKey: ['myPlaylistThumbnail'],
    queryFn: fetchMyPlaylistThumbnail,
  });

  const { data: likePlaylistData } = useQuery({
    queryKey: ['likePlaylistThumbnail'],
    queryFn: fetchLikePlaylistThumbnail,
  });

  const handleForwardClick = () => {
    if (myPlaylistData.length - 4 > pageIndex) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  if (myPlaylistData) {
    // 데이터가 존재할 때만 PopularMusic 컴포넌트 생성
    for (let i = 0; i < myPlaylistData.length; i += 1) {
      if (myPlaylistData[i]) {
        // 데이터가 존재하는 경우에만 생성
        musicList.push(
          <Link
            href={`/playlist/${myPlaylistData[i].playlist_name}`} // 플레이리스트 이름으로 링크, 그러나 아이디로 링크할 수도 있음(수정 가능성 있음)
            className="flex w-1/6 items-center justify-center"
          >
            <AlbumCoverUser
              image1={myPlaylistData[i].thumbnails[0]}
              image2={myPlaylistData[i].thumbnails[1]}
              image3={myPlaylistData[i].thumbnails[2]}
              title={myPlaylistData[i].playlist_name}
            />
          </Link>,
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
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div
        className="fixed w-screen h-screen inset-0 bg-black opacity-90"
        onClick={() => {
          setCreatePlayListModalOpen(false);
        }}
      />
      <div className="bg-zinc-800 p-8 w-3/5 h-3/5 flex flex-col z-50 rounded-2xl border-4 drop-shadow-md border-gray-400">
        <h1 className="text-4xl mt-16 text-white">새로운 플레이리스트</h1>
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
          <div className="w-full">{publicScope ? 'Public' : 'Private'}</div>
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
            onClick={() => handleCancelClick()}
          >
            취소
          </p>

          <p
            className="flex text-xl w-32 h-16 font-bold rounded-full justify-center items-center bg-white text-purple-700 m-4 cursor-pointer hover-bg-opacity hover:rounded-full"
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

      <div className="w-1/12 h-full flex flex-row justify-center items-center opacity-95 z-30 bg-gray-650 rounded-2xl">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>

      <div
        className={
          'w-5/6 h-full flex flex-col flex-wrap justify-center items-start slide-content'
        }
        style={getSlideContentStyle(pageIndex, 6)}
      >
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

        {/* 좋아요 누른 곡 버튼 */}
        <AlbumCoverUser
          image1="https://i.ibb.co/VQycV7k/like.png"
          image2={likePlaylistData[0]}
          image3={likePlaylistData[1]}
          title="좋아요 누른 곡"
        />

        {/* 내가 생성한 플리 버튼 */}
        {musicList}
      </div>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 opacity-95 bg-gray-650 rounded-2xl">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default MyPlaylistComponent;
