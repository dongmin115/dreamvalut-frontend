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
import { getMyPlaylists, getPlaylist } from '@/api/playlist';
import getMusic from '@/api/music';
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
  }, [audioRef, isDragging]);

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

  const { data: musicData, isLoading: musicLoading } = useQuery({
    queryKey: ['music'],
    queryFn: () => getMusic(props.params.trackId),
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
      <div className="w-screen h-screen flex flex-row justify-around pl-[15%]">
        {/* 블러배경 */}
        <img
          src={musicLoading ? 'loading' : musicData.track_image}
          alt="1"
          className="w-full h-full blur -z-20 fixed"
        />
        {/* 검은색 레이어 */}
        <div className="w-full h-full bg-black bg-opacity-30 fixed -z-10" />
        {/* 음악정보 */}
        <div className="flex flex-col items-center justify-center h-full w-[40%] space-y-4">
          <h1 className="text-4xl text-white drop-shadow-lg">
            {musicLoading ? 'loading' : musicData.title}
          </h1>
          <p className="text-[#777777] drop-shadow-md">
            {musicLoading ? 'loading' : musicData.uploader_name}
          </p>
          {/* 프롬프트 + 썸네일 */}
          <div id="card">
            <div
              id="card-back"
              className="w-96 h-96 rounded-md drop-shadow-lg bg-[#2B2B2B] p-6"
            >
              <p className="font-semibold text-lg mb-4">음악생성 프롬프트</p>
              <p className="text-sm">
                {musicLoading ? 'loading' : musicData.prompt}
              </p>
            </div>
            <img
              id="card-front"
              src={musicLoading ? 'loading' : musicData.thumbnail_image}
              alt="1"
              className="w-96 h-96 rounded-md drop-shadow-lg"
            />
          </div>
          {/* 재생 컨트롤러 */}
          <div className="w-96">
            <div className="flex flex-col items-center mt-6">
              <div className="flex flex-row justify-between w-full">
                <p className="text-white text-sm">{formatTime(currentTime)}</p>
                <p className="text-white text-sm">
                  {musicLoading ? 'loading' : formatTime(musicData.duration)}
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
              />
            </div>
            <div className="flex justify-between">
              <IconButton>
                <Favorite color="secondary" fontSize="large" />
              </IconButton>
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
                <div className="w-[10vw] py-2 px-4 flex flex-row items-center space-x-2 bg-black bg-opacity-40 rounded-full shadow-md">
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
        <div className="flex flex-col items-center justify-center h-full w-[30%] space-y-4">
          <div className="flex flex-row justify-between w-full h-fit items-center">
            <h1 className="text-4xl text-white drop-shadow-lg h-fit m-0">
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
                  className="flex flex-row space-x-4 self-start hover:bg-[#040404] hover:bg-opacity-30 hover:rounded-md w-full p-2"
                >
                  <img
                    src={track.thumbnail_image}
                    alt="음악 커버"
                    className="w-16 h-16 rounded-md drop-shadow-lg"
                  />
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-white text-lg">{track.title}</p>
                    <p className="text-[#777777]">{track.uploader_name}</p>
                  </div>
                </li>
              ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
