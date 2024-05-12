/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable function-paren-newline */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { fetchPlaylistDetail, patchPlaylistName } from '@/api/playlist.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { IconButton, ThemeProvider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import theme from '@/app/styles/theme.ts';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayButton from './PlayButton.tsx';
import MusicElement from './MusicElement.tsx';

function page(props: any) {
  const playlistId = decodeURIComponent(props.params.playlistId);
  const renderSize = 12;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [editOpen, setEditOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['Playlist Details', playlistId],
    queryFn: ({ pageParam }) =>
      fetchPlaylistDetail(playlistId, pageParam, renderSize),
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.tracks.next === null) {
        return undefined;
      }
      return allPages.length;
    },
  });
  const loadMoreRef = useRef(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null, // 기본적으로 브라우저 뷰포트를 root로 사용
        rootMargin: '0px',
        threshold: 0.1, // 타겟 요소가 10% 보이면 콜백 실행
      },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data === undefined) return;
    setPlaylistName(data.pages['0'].playlist_name);
  }, [data]);

  if (isLoading || data === undefined) return <div>Loading...</div>;
  return (
    <div className="flex h-full w-full flex-col items-end justify-end overflow-hidden">
      <div className="h-full w-10/12 pr-8">
        {/* 플리 제목 및 플레이 아이콘 */}
        <div className="flex w-full flex-row items-center justify-center ">
          <h1 className="w-full text-start">
            {playlistId === 'like' ? (
              '좋아요 누른 곡'
            ) : editOpen ? (
              <div className="flex flex-row items-center justify-start">
                <input
                  type="text"
                  className="bg-gray-650 h-16 rounded-2xl p-4 text-4xl text-white focus:outline-none"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
                <button
                  type="button"
                  className="mx-2 flex h-14 w-28 items-center justify-center rounded-2xl bg-zinc-700 p-2 text-2xl text-white focus:outline-none"
                  onClick={() => {
                    setEditOpen(false);
                    patchPlaylistName(playlistId, playlistName);
                  }}
                >
                  <EditIcon className="mr-2" />
                  수정
                </button>
              </div>
            ) : (
              <p>{playlistName}</p>
            )}
          </h1>
          <PlayButton playlistId={playlistId} />
          {data.pages['0'].is_owner && (
            <ThemeProvider theme={theme}>
              <IconButton className="mr-8" onClick={handleClick}>
                <MoreVertIcon color="primary" fontSize="large" />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                  className: 'bg-zinc-800 text-white w-72',
                }}
              >
                <MenuItem
                  className="h-12 text-lg"
                  onClick={() => {
                    handleClose();
                    setEditOpen(true);
                  }}
                >
                  <EditIcon className="mx-2" />
                  플레이리스트 이름 수정
                </MenuItem>
                <MenuItem className="h-12 text-lg" onClick={handleClose}>
                  <DeleteIcon className="mx-2" />
                  플레이리스트 삭제
                </MenuItem>
              </Menu>
            </ThemeProvider>
          )}
        </div>
        {/* 플리 박스 */}
        <div className="bg-gray-650 flex h-auto w-full flex-col items-center rounded-2xl p-8">
          <div className="flex w-full flex-row">
            <p className="flex w-full px-20 text-2xl"> 곡 정보</p>
            <p className="flex w-2/12 items-center justify-center text-2xl">
              좋아요
            </p>
            <p className="flex w-24 justify-center text-2xl ">재생</p>
          </div>
          <hr className="my-6 w-full border-zinc-600" />
          {/* 음악 요소들 */}
          {data.pages.map((page: any) =>
            page.tracks.content.map((track: any) => (
              <MusicElement
                key={track.track_id}
                image={track.thumbnail_image}
                title={track.title}
                like={track.likes}
                isLiked={track.likes_flag}
                trackId={track.track_id}
              />
            )),
          )}
          <div ref={loadMoreRef} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default page;
