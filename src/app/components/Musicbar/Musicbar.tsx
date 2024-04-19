/* eslint-disable operator-linebreak */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useState } from 'react';
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
import getMusic from '@/api/music.ts';
import theme from '@/app/styles/theme.ts';
import { useSharedAudio } from '../audio/Audio.tsx';

/* eslint-disable @next/next/no-img-element */
export default function MusicBar(trackId: number) {
  const path = usePathname();
  if (
    path === '/' ||
    path === '/path1' ||
    path === '/path2' ||
    path.startsWith('/musicpage')
  ) {
    return null;
  }

  const { audioRef, playAudio, pauseAudio } = useSharedAudio();
  const [isPaused, setIsPaused] = useState<boolean>(true);

  // 볼륨조절
  const [volume, setVolume] = useState<number>(30);

  const handleChange = (event: Event, newVolume: number | number[]) => {
    if (audioRef.current) {
      setVolume(newVolume as number);
      audioRef.current.volume = volume / 100;
    }
  };

  const { data } = useQuery({
    queryKey: ['music'],
    queryFn: () => getMusic(trackId),
  });

  return data ? (
    <div className="fixed bottom-[1%] items-center w-[83%] h-[7%] rounded-md ml-[16%] px-[2%] py-[0.5%] flex justify-between bg-gradient-to-r from-[#333333] from-20% via-[#7c7a47] via-50%  to-[#333333] to-90% shadow-lg z-40">
      {/* 음악소스 */}
      <audio ref={audioRef} controls preload="auto" className="hidden">
        <source src={data.track_url} type="audio/wav" />
      </audio>
      {/* 재생 컨트롤 버튼 */}
      <div className="flex flex-row py-[0.5%] items-center">
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
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
        <div className="flex flex-col justify-center items-center text-md">
          <p className="">{data.title}</p>
          <p className="text-gray-400 text-xs">{data.uploader_name}</p>
        </div>
      </div>
      {/* 볼륨 조절 */}
      <div className="w-[12%] flex items-center space-x-2 min-w-[120px]">
        <ThemeProvider theme={theme}>
          <VolumeDown color="primary" fontSize="medium" />
          <Slider
            aria-label="Volume"
            value={volume}
            onChange={handleChange}
            size="small"
          />
          <VolumeUp color="primary" fontSize="medium" />
        </ThemeProvider>
      </div>
    </div>
  ) : null;
}
