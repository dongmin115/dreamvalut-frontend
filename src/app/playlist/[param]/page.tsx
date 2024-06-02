/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import {
  deleteFollow,
  deletePlaylist,
  getPlaylistMusic,
  patchPlaylistName,
  postFollow,
} from '@/api/playlist.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IconButton, ThemeProvider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import theme from '@/app/styles/theme.ts';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import InfiniteScroll from '@/app/components/InfiniteScroll.tsx';
import { Music } from '@/types/music.ts';
import { Playlist, playlistParam } from '@/types/playlist.ts';
import Image from 'next/image';
import PlayButton from './PlayButton.tsx';
import MusicElement from './MusicElement.tsx';

function page(props: any) {
  const router = useRouter();
  const param = decodeURIComponent(props.params.param);
  const paramsArray = param.split('&');
  const paramObj: playlistParam = {
    type: '',
    id: 0,
  };
  paramsArray.forEach((param: string) => {
    const [key, value] = param.split('=');
    if (key === 'type') {
      paramObj.type = value;
    } else if (key === 'id') {
      paramObj.id = parseInt(value, 10);
    }
  });
  const playlistType = paramObj.type;
  const playlistId = paramObj.id;
  const renderSize = 12;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [editOpen, setEditOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [isFollow, setIsFollow] = useState(false);

  const fetchMoreTracks = async ({ pageParam = 0 }) => {
    const response = await getPlaylistMusic(
      playlistType,
      playlistId,
      pageParam,
      renderSize,
    );
    return response;
  };

  const getNextPageParam = (lastPage: Playlist, allPages: Playlist[]) => {
    if (lastPage.tracks.last) {
      return undefined;
    }
    return allPages.length;
  };

  const { data, isLoading } = useInfiniteQuery({
    queryKey: ['Playlist Details', playlistId],
    queryFn: fetchMoreTracks,
    getNextPageParam,
    initialPageParam: 0,
  });

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePlaylist = async () => {
    setEditOpen(false);
    handleClose();
    Swal.fire({
      title: '정말 삭제 하시겠어요?',
      text: '삭제하면 되돌릴 수 없어요!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#777',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'swal2-dark', // 여기에 다크 테마 클래스 추가
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '삭제 완료',
          text: '플레이리스트가 삭제 되었습니다!',
          icon: 'success',
          customClass: {
            popup: 'swal2-dark', // 여기에 다크 테마 클래스 추가
          },
        });
        deletePlaylist(playlistId);
        router.push('/playlist');
      }
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      if (playlistType === 'like') {
        setPlaylistName('좋아요 누른 곡');
      } else if (playlistType === 'tag') {
        setPlaylistName(`# ${data.pages['0'].tag_name}`);
      } else if (playlistType === 'genre') {
        setPlaylistName(data.pages['0'].genre_name);
      } else {
        setPlaylistName(data.pages['0'].playlist_name);
      }

      setIsFollow(data.pages['0'].is_follow);
    }
  }, [data, playlistType]);

  if (isLoading || data === undefined) return <div>Loading...</div>;
  return (
    <div className="-z-10 flex h-full w-full flex-col items-end justify-center overflow-hidden">
      {playlistType === 'genre' && (
        <div className="relative -z-10 -mb-20 flex h-40 w-full items-center justify-center">
          <Image
            src={data.pages['0'].genre_image}
            alt="playlist"
            className="h-full w-full"
            objectFit="cover"
            layout="fill"
          />
          <div
            className="bg-gray-650 absolute bottom-0 left-0 flex h-full w-full items-end justify-end p-4 text-white"
            style={{
              background:
                'linear-gradient(to top, rgba(26, 26, 26, 1) 10%,rgba(26, 26, 26, 0.95) 30%,  rgba(26, 26, 26, 0.1) 100%)',
            }}
          />
        </div>
      )}
      <div className="h-full w-full px-8">
        {/* 플리 제목 및 플레이 아이콘 */}
        <div className="flex w-full flex-row items-center justify-center ">
          <h1 className="mb-5 mt-14 w-full text-xl font-bold xl:text-2xl 2xl:text-3xl">
            {editOpen ? (
              <div className="flex flex-row items-center justify-start">
                <input
                  type="text"
                  className="bg-gray-650 h-16 w-auto rounded-2xl p-4 text-4xl text-white focus:outline-none"
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
              <p className="flex h-16 items-center justify-start p-4">
                {playlistName}
              </p>
            )}
          </h1>
          {/* 플레이리스트 생성자가 아닐 경우 보여주는 팔로우 버튼 */}
          {!data.pages['0'].is_owner &&
            data.pages['0'].is_public &&
            (isFollow ? (
              <button
                onClick={() => {
                  setIsFollow(false);
                  deleteFollow(playlistId).catch(() => {
                    setIsFollow(true);
                    console.error('언팔로우 실패');
                  });
                }}
                className="flex h-14 w-44 items-center justify-center rounded-2xl bg-zinc-700 p-2 text-2xl text-white focus:outline-none"
              >
                언팔로우
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsFollow(true);
                  postFollow(playlistId).catch(() => {
                    setIsFollow(false);
                    console.error('팔로우 실패');
                  });
                }}
                className="flex h-14 w-44 items-center justify-center rounded-2xl bg-zinc-200 p-2 text-2xl text-black focus:outline-none"
              >
                <SubscriptionsIcon className="mr-3" />
                팔로우
              </button>
            ))}

          <PlayButton playlistId={playlistId} />

          {/* 플레이리스트 생성자 일 경우 보여주는 메뉴 */}
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
                  플레이리스트 수정
                </MenuItem>
                <MenuItem
                  className="h-12 text-lg"
                  onClick={handleDeletePlaylist}
                >
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
          <InfiniteScroll
            queryKey={['Playlist Details', playlistId]}
            queryFn={fetchMoreTracks}
            renderItem={(track: Music) => (
              <MusicElement
                key={track.track_id}
                image={track.thumbnail_image}
                title={track.title}
                like={track.likes}
                isLiked={track.likes_flag}
                trackId={track.track_id}
                playlistId={playlistId}
                isEdit={editOpen}
              />
            )}
            getNextPageParam={getNextPageParam}
            dataPath={(page: Playlist) => page.tracks.content}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
