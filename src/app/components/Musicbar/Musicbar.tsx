/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useEffect, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ReplayIcon from '@mui/icons-material/Replay';
import PauseIcon from '@mui/icons-material/Pause';
import { ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/dist/client/components/navigation';
import { getMusic } from '@/api/music.ts';
import theme from '@/app/styles/theme.ts';
import { useSharedAudio } from '../audio/Audio.tsx';

/* eslint-disable @next/next/no-img-element */
export default function MusicBar() {
  const path = usePathname();
  if (
    path === '/' ||
    path === '/path1' ||
    path === '/path2' ||
    path.startsWith('/track')
  ) {
    return null;
  }

  // 시간 변환 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const {
    audioRef,
    playAudio,
    pauseAudio,
    currentTime,
    setCurrentTime,
    volume,
    setVolume,
    trackId,
  } = useSharedAudio();
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

  useEffect(() => {
    // 마우스 업 이벤트를 전역적으로 처리
    const handleMouseUpGlobal = () => {
      setIsDragging(false); // 드래그 상태 업데이트
    };

    // 마우스 다운 이벤트는 슬라이더에서만 처리
    const handleMouseDownLocal = () => {
      setIsDragging(true); // 드래그 시작
    };

    const sliderElement = document.querySelector('.volume-slider'); // 슬라이더 요소 선택
    if (sliderElement) {
      sliderElement.addEventListener('mousedown', handleMouseDownLocal);
    }

    window.addEventListener('mouseup', handleMouseUpGlobal); // 전역에 마우스 업 이벤트 추가

    return () => {
      // 클린업 함수에서 이벤트 리스너 제거
      if (sliderElement) {
        sliderElement.removeEventListener('mousedown', handleMouseDownLocal);
      }
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);

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

  const handleChange = (event: Event, newVolume: number | number[]) => {
    if (audioRef.current) {
      setVolume(newVolume as number);
      audioRef.current.volume = volume / 100;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['music', trackId],
    queryFn: () => getMusic(trackId),
    enabled: !!trackId,
  });

  return data ? (
    <ThemeProvider theme={theme}>
      <div className="fixed bottom-[1%] z-40 ml-[16%] flex h-[7%] w-[83%] items-center justify-between rounded-md bg-gradient-to-r from-[#333333]  via-[#6b26ff75] to-[#333333] px-[2%] py-[0.5%] shadow-lg">
        {/* 음악소스 */}
        <audio ref={audioRef} controls preload="auto" className="hidden">
          {!isLoading && <source src={data.track_url} type="audio/wav" />}
        </audio>
        <Slider
          aria-label="Volume"
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${formatTime(value)}`} // 형식화된 값 설정
          value={currentTime}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderRelease}
          max={data.duration}
          size="medium"
          color="primary"
          className="absolute left-0 top-0 w-full p-0"
        />
        {/* 재생 컨트롤 버튼 */}
        <div className="flex flex-row items-center py-[0.5%]">
          <IconButton>
            <SkipPreviousIcon color="primary" fontSize="large" />
          </IconButton>
          {isPaused ? (
            <IconButton
              onClick={() => {
                playAudio();
                setIsPaused(false);
              }}
            >
              <PlayArrowIcon color="primary" fontSize="large" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                pauseAudio();
                setIsPaused(true);
              }}
            >
              <PauseIcon color="primary" fontSize="large" />
            </IconButton>
          )}
          <IconButton>
            <SkipNextIcon color="primary" fontSize="large" />
          </IconButton>
          <IconButton>
            <ReplayIcon color="primary" fontSize="medium" />
          </IconButton>
        </div>
        {/* 음악 정보 */}
        <div className="flex flex-row space-x-4">
          <img
            src={data.thumbnail_image}
            alt="album"
            width={50}
            height={50}
            className="rounded-sm drop-shadow-sm"
          />
          <div className="text-md flex flex-col items-center justify-center">
            <p className="">{data.title}</p>
            <p className="text-xs text-gray-400">{data.uploader_name}</p>
          </div>
        </div>
        {/* 볼륨 조절 */}
        <div className="flex w-[12%] min-w-[120px] items-center space-x-2">
          <VolumeDown color="primary" fontSize="medium" />
          <Slider
            aria-label="Volume"
            value={volume}
            onChange={handleChange}
            size="small"
          />
          <VolumeUp color="primary" fontSize="medium" />
        </div>
      </div>
    </ThemeProvider>
  ) : null;
}
