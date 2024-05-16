/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable object-curly-newline */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import { ThemeProvider } from '@emotion/react';
import { Button, Divider, IconButton, Popover, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Favorite from '@mui/icons-material/Favorite';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { getMyPlaylists, getPlaylist } from '@/api/playlist';
import { getMusic, disLikes, likes } from '@/api/music';
import theme from '@/app/styles/theme';
import { useSharedAudio } from '@/app/components/audio/Audio';

export default function MusicPage(props: any) {
  // const [selectedPlaylist, setSelectedPlaylist] = useState<number>(1); // 선택한 플레이리스트
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const id = open2 ? 'simple-popover' : undefined;
  const {
    audioRef,
    playAudio,
    pauseAudio,
    currentTime,
    setCurrentTime,
    volume,
    setVolume,
  } = useSharedAudio();
  // 재생목록 버튼 클릭시 메뉴 열기
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // 재생목록 버튼 메뉴 닫기
  const handleClose = () => {
    setAnchorEl(null);
  };
  // 재생목록 버튼 클릭시 메뉴 열기
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  // 재생목록 버튼 메뉴 닫기
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // 시간 변환 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // 볼륨 크기 조절
  const handleChange = (event: Event, newVolume: number | number[]) => {
    if (audioRef.current) {
      setVolume(newVolume as number);
      audioRef.current.volume = volume / 100;
    }
  };

  // 음악재생
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState(false); // 슬라이더를 드래그 중인지 여부를 나타내는 상태

  // 재생 시간이 변경될 때마다 현재 재생 시간을 설정합니다.
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleTimeUpdate = () => {
        // 슬라이더를 드래그 중이 아닐 때만 현재 재생 시간을 설정합니다.
        if (!isDragging) {
          setCurrentTime(audioElement.currentTime);
        }
      };
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [audioRef, isDragging, setCurrentTime]);

  // 슬라이더 변경 시 음악의 재생 시간을 변경합니다.
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (!event.defaultPrevented) {
      setCurrentTime(newValue as number);
    }
  };

  // 슬라이더에서 마우스를 뗄 때 호출되는 함수
  const handleSliderRelease = () => {
    // 변경된 시간을 재생 시간으로 설정
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  };

  // API 호출
  // 특정 플레이리스트 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ['playlist'],
    queryFn: getPlaylist,
    // () => {
    //   getPlaylist(selectedPlaylist);
    // },
  });

  // 모든 플레이리스트 가져오기
  const { data: listData, isLoading: listLoading } = useQuery({
    queryKey: ['AllPlaylist'],
    queryFn: getMyPlaylists,
  });

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { data: musicData, isLoading: musicLoading } = useQuery({
    queryKey: ['music'],
    queryFn: () => getMusic(props.params.trackId, setIsLiked),
  });

  return (
    <ThemeProvider theme={theme}>
      {/* 음악소스 */}
      <audio ref={audioRef} controls preload="auto" className="hidden">
        <source
          src={musicLoading ? 'loading' : musicData.track_url}
          type="audio/wav"
        />
      </audio>
      {/* 블러배경 */}
      {!musicLoading && (
        <div className="flex h-screen w-screen flex-row justify-around pl-[15%]">
          <img
            src={musicData.track_image}
            alt="1"
            className="fixed -z-20 h-full w-full blur"
          />
          {/* 검은색 레이어 */}
          <div className="fixed -z-10 h-full w-full bg-black bg-opacity-30" />
          {/* 음악정보 */}
          <div className="flex h-full w-[40%] flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl text-white drop-shadow-lg">
              {musicData.title}
            </h1>
            <p className="text-[#777777] drop-shadow-md">
              {musicData.uploader_name}
            </p>
            {/* 프롬프트 + 썸네일 */}
            <div id="card">
              <div
                id="card-back"
                className="h-96 w-96 rounded-md bg-[#2B2B2B] p-6 drop-shadow-lg"
              >
                <p className="mb-4 text-lg font-semibold">음악생성 프롬프트</p>
                <p className="text-sm">{musicData.prompt}</p>
              </div>
              <img
                id="card-front"
                src={musicData.thumbnail_image}
                alt="1"
                className="h-96 w-96 rounded-md drop-shadow-lg"
              />
            </div>
            {/* 재생 컨트롤러 */}
            <div className="w-96">
              <div className="mt-6 flex flex-col items-center">
                <div className="flex w-full flex-row justify-between">
                  <p className="text-sm text-white">
                    {formatTime(currentTime)}
                  </p>
                  <p className="text-sm text-white">
                    {formatTime(musicData.duration)}
                  </p>
                </div>
                <Slider
                  aria-label="Volume"
                  value={currentTime}
                  onChange={handleSliderChange}
                  onChangeCommitted={handleSliderRelease}
                  onMouseDown={() => setIsDragging(true)} // 슬라이더를 드래그하기 시작하면 상태를 변경합니다.
                  onMouseUp={() => setIsDragging(false)} // 슬라이더에서 손을 떼면 상태를 변경합니다.
                  size="medium"
                  color="secondary"
                  max={musicData.duration}
                />
              </div>
              <div className="flex justify-between">
                {isLiked ? (
                  <IconButton>
                    <Favorite
                      color="secondary"
                      fontSize="large"
                      onClick={() => {
                        setIsLiked(false);
                        disLikes(props.params.trackId).catch(() => {
                          // API 호출이 실패하면 상태를 되돌립니다
                          setIsLiked(true);
                        });
                      }}
                    />
                  </IconButton>
                ) : (
                  <IconButton>
                    <FavoriteBorder
                      color="secondary"
                      fontSize="large"
                      onClick={() => {
                        setIsLiked(true);
                        likes(props.params.trackId).catch(() => {
                          // API 호출이 실패하면 상태를 되돌립니다
                          setIsLiked(false);
                        });
                      }}
                    />
                  </IconButton>
                )}
                <IconButton>
                  <SkipPreviousIcon color="secondary" fontSize="large" />
                </IconButton>
                {isPaused ? (
                  <IconButton
                    onClick={() => {
                      playAudio();
                      setIsPaused(false);
                    }}
                    disabled={musicLoading}
                  >
                    <PlayArrowIcon color="secondary" fontSize="large" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      pauseAudio();
                      setIsPaused(true);
                    }}
                  >
                    <PauseIcon color="secondary" fontSize="large" />
                  </IconButton>
                )}
                <IconButton>
                  <SkipNextIcon color="secondary" fontSize="large" />
                </IconButton>
                <IconButton aria-describedby={id} onClick={handleClick2}>
                  <VolumeUp color="secondary" fontSize="large" />
                </IconButton>
                <Popover
                  id={id}
                  open={open2}
                  anchorEl={anchorEl2}
                  onClose={handleClose2}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  sx={{
                    '& .MuiPopover-paper': {
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    },
                  }}
                >
                  <div className="flex w-[10vw] flex-row items-center space-x-2 rounded-full bg-black bg-opacity-40 px-4 py-2 shadow-md">
                    <VolumeDown color="secondary" fontSize="medium" />
                    <Slider
                      aria-label="Volume"
                      value={volume}
                      onChange={handleChange}
                      size="small"
                      color="secondary"
                    />
                    <VolumeUp color="secondary" fontSize="medium" />
                  </div>
                </Popover>
              </div>
            </div>
          </div>
          {/* 재생목록 */}
          <div className="flex h-full w-[30%] flex-col items-center justify-center space-y-4">
            <div className="flex h-fit w-full flex-row items-center justify-between">
              <h1 className="m-0 h-fit text-4xl text-white drop-shadow-lg">
                Playlist
              </h1>
              <Button
                color="secondary"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                재생목록 선택
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {listLoading
                  ? 'loading'
                  : listData.data.playlists.map((e: any) => (
                      <MenuItem
                        key={e.playlist_id}
                        onClick={() => {
                          handleClose();
                          // setSelectedPlaylist(e.playlist_id);
                        }}
                      >
                        {e.playlist_name}
                      </MenuItem>
                    ))}
              </Menu>
            </div>
            <Divider
              variant="fullWidth"
              orientation="horizontal"
              flexItem
              className="w-full bg-white drop-shadow-xl"
            />
            {/* 재생목록 리스트 */}
            {isLoading
              ? 'loading'
              : data.tracks.content.map((track: any) => (
                  <li
                    key={track.id}
                    className="flex w-full flex-row space-x-4 self-start p-2 hover:rounded-md hover:bg-[#040404] hover:bg-opacity-30"
                  >
                    <img
                      src={track.thumbnail_image}
                      alt="음악 커버"
                      className="h-16 w-16 rounded-md drop-shadow-lg"
                    />
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-lg text-white">{track.title}</p>
                      <p className="text-[#777777]">{track.uploader_name}</p>
                    </div>
                  </li>
                ))}
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}
