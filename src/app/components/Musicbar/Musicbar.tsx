/* eslint-disable import/no-extraneous-dependencies */

'use client';

// import { useEffect, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ReplayIcon from '@mui/icons-material/Replay';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const theme = createTheme({
  palette: {
    primary: {
      // 메인 컬러 보라색
      main: '#6C26FF',
    },
  },
});

/* eslint-disable @next/next/no-img-element */
export default function MusicBar() {
  // const [albumColor, setAlbumColor] = useState<string>('#000000');
  // useEffect(() => {
  //   setAlbumColor('#FE4500');
  // }, []);

  return (
    <div className="fixed bottom-[2%] left-[15%] w-[80%] h-[7%] rounded-md px-[2%] py-[0.5%] flex justify-between bg-gradient-to-r from-[#333333] from-20% via-[#7c7a47] via-50%  to-[#333333] to-90% shadow-lg">
      {/* 재생 컨트롤 버튼 */}
      <div className="flex flex-row py-[0.5%] items-center">
        <ThemeProvider theme={theme}>
          <IconButton>
            <SkipPreviousIcon color="primary" fontSize="large" />
          </IconButton>
          <IconButton>
            <PlayArrowIcon color="primary" fontSize="large" />
          </IconButton>
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
          src="https://via.placeholder.com/50"
          alt="album cover"
          width={50}
          height={50}
        />
        <div className="flex flex-col justify-center items-center">
          <p className="">music title</p>
          <p className="text-gray-400">artist name</p>
        </div>
      </div>
      {/* 볼륨 조절 */}
      <div className="flex flex-row">
        <img
          src="https://via.placeholder.com/50"
          alt="volume down btn"
          width={50}
          height={50}
        />
        <img
          src="https://via.placeholder.com/50"
          alt="volume bar"
          width={50}
          height={50}
        />
        <img
          src="https://via.placeholder.com/50"
          alt="volume up btn"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
