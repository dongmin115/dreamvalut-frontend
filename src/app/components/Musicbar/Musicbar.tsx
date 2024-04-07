/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { useRef, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ReplayIcon from '@mui/icons-material/Replay';
import PauseIcon from '@mui/icons-material/Pause';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import getMusic from '@/api/music';
import { useQuery } from '@tanstack/react-query';

const theme = createTheme({
  palette: {
    primary: {
      // 메인 컬러 보라색
      main: '#6C26FF',
    },
    secondary: {
      // 흰색
      main: '#ffffff',
    },
  },
});

/* eslint-disable @next/next/no-img-element */
export default function MusicBar() {
  // const [albumColor, setAlbumColor] = useState<string>('#000000');
  // useEffect(() => {
  //   setAlbumColor('#FE4500');
  // }, []);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  // 재생함수
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPaused(false);
    }
  };

  // 일시정지함수
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };
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
    queryFn: getMusic,
    initialData: {
      track_id: 1,
      title: '초기제목',
      uploader_name: 'Uploader 1',
      has_lyrics: false,
      track_url:
        'https://s3upload-test-s3.s3.ap-northeast-2.amazonaws.com/Melancholy+Motif.wav',
      track_image: 'url/to/image.png',
      thumbnail_image: 'url/to/thumbnail.png',
      prompt: 'This is the prompt how this track was made...',
    },
  });

  return (
    <div className="fixed bottom-[1%] items-center w-[83%] h-[7%] rounded-md ml-[16%] px-[2%] py-[0.5%] flex justify-between bg-gradient-to-r from-[#333333] from-20% via-[#7c7a47] via-50%  to-[#333333] to-90% shadow-lg z-40">
      {/* 음악소스 */}
      <audio ref={audioRef} controls preload="auto" className="hidden">
        <source src={data.track_url} id="audio_player" type="audio/wav" />
      </audio>
      {/* 재생 컨트롤 버튼 */}
      <div className="flex flex-row py-[0.5%] items-center">
        <ThemeProvider theme={theme}>
          <IconButton>
            <SkipPreviousIcon color="primary" fontSize="large" />
          </IconButton>
          {isPaused ? (
            <IconButton onClick={playAudio}>
              <PlayArrowIcon color="primary" fontSize="large" />
            </IconButton>
          ) : (
            <IconButton onClick={pauseAudio}>
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
        <img src={data.thumbnail_image} alt="album" width={50} height={50} />
        <div className="flex flex-col justify-center items-center">
          <p className="">{data.title}</p>
          <p className="text-gray-400">{data.uploader_name}</p>
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
  );
}
