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
  const [createPlayListModalOpen, setCreatePlayListModalOpen] = useState(true);
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
              Id={1}
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
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div
        className="fixed inset-0 h-screen w-screen bg-black opacity-90"
        onClick={() => {
          setCreatePlayListModalOpen(false);
        }}
      />
      <div className="z-50 flex h-3/5 w-3/5 flex-col rounded-2xl border-4 border-gray-400 bg-zinc-800 p-8 drop-shadow-md">
        <h1 className="mt-16 text-4xl text-white">새로운 플레이리스트</h1>
        <input
          className="my-24 h-12 w-3/4 border-b border-gray-500 bg-zinc-800 p-4 text-xl text-gray-100 focus:outline-none"
          placeholder="플레이리스트 이름을 입력하세요"
        />
        <p className="my-6 text-sm text-zinc-600">공개 범위</p>
        <div
          className="flex w-1/5 cursor-pointer flex-row items-center border-b border-gray-500 px-4 text-xl"
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
          <div className="my-6 text-sm text-zinc-600">
            ! 공개 범위를 Public으로 설정하면 모든 사람들이 회원님의
            플레이리스트를 볼 수 있습니다.
          </div>
        )}
        <div className="flex h-full w-full flex-row items-end justify-end">
          <p
            className="hover-bg-opacity m-4 flex h-16 w-32  cursor-pointer items-center justify-center text-xl font-bold text-white hover:rounded-full"
            onClick={() => handleCancelClick()}
          >
            취소
          </p>

          <p
            className="hover-bg-opacity m-4 flex h-16 w-32 cursor-pointer items-center justify-center rounded-full bg-white text-xl font-bold text-purple-700 hover:rounded-full"
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

      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center rounded-2xl opacity-95">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>

      <div
        className={
          'slide-content flex h-full w-5/6 flex-col flex-wrap items-start justify-center'
        }
        style={getSlideContentStyle(pageIndex, 6)}
      >
        {/* 플리 생성 버튼 */}
        <div
          className="hover-bg-big m-4 mt-12 flex h-auto w-56 cursor-pointer flex-col items-center justify-center"
          onClick={() => setCreatePlayListModalOpen(true)}
        >
          <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-zinc-500">
            <AddIcon color="primary" fontSize="large" />
          </div>
          <p className="mt-4 text-center text-lg text-white">
            플레이리스트 생성
          </p>
        </div>

        {/* 좋아요 누른 곡 버튼 */}
        <AlbumCoverUser
          image1="https://i.ibb.co/VQycV7k/like.png"
          image2={likePlaylistData[0]}
          image3={likePlaylistData[1]}
          title="좋아요 누른 곡"
          Id="like"
        />

        {/* 내가 생성한 플리 버튼 */}
        {musicList}
      </div>
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center rounded-2xl opacity-95">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default MyPlaylistComponent;
