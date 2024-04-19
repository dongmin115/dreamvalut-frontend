/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable object-curly-newline */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import { ThemeProvider } from '@emotion/react';
import { Button, Divider, IconButton, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
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
  const open = Boolean(anchorEl);
  const { audioRef, playAudio, pauseAudio } = useSharedAudio();
  // 재생목록 버튼 클릭시 메뉴 열기
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // 재생목록 버튼 메뉴 닫기
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 시간 변환 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const [isPaused, setIsPaused] = useState<boolean>(true);

  // 볼륨조절
  const [volume, setVolume] = useState<number>(30);
  const handleChange = (event: Event, newVolume: number | number[]) => {
    if (audioRef.current) {
      setVolume(newVolume as number);
      audioRef.current.volume = volume / 100;
    }
  };

  const [currentTime, setCurrentTime] = useState<number>(0);

  // 재생 시간이 변경될 때마다 현재 재생 시간을 설정합니다.
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime);
      };
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [audioRef]);

  // 슬라이더 변경 시 음악의 재생 시간을 변경합니다.
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime = newValue as number;
    }
  };

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
              <p className="text-white text-sm self-end">
                {musicLoading ? 'loading' : formatTime(musicData.duration)}
              </p>
              <Slider
                aria-label="Volume"
                value={currentTime}
                onChange={handleSliderChange}
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
              <IconButton>
                <ReplayIcon color="secondary" fontSize="large" />
              </IconButton>
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
          {/* 볼륨 조절 */}
          <div className="w-[12%] flex items-center space-x-2 min-w-[120px]">
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
