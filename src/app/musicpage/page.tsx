/* eslint-disable indent */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable object-curly-newline */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { Button, Divider, IconButton, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ReplayIcon from '@mui/icons-material/Replay';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyPlaylists, getPlaylist } from '@/api/playlist';

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

export default function MusicPage() {
  // const [selectedPlaylist, setSelectedPlaylist] = useState<number>(1); // 선택한 플레이리스트
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // 재생목록 버튼 클릭시 메뉴 열기
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // 재생목록 버튼 메뉴 닫기
  const handleClose = () => {
    setAnchorEl(null);
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

  return (
    <ThemeProvider theme={theme}>
      <div className="w-screen h-screen flex flex-row justify-around pl-[15%]">
        {/* 블러배경 */}
        <img
          src="https://i.ibb.co/hLxvjJG/1.jpg"
          alt="1"
          className="w-full h-full blur -z-20 fixed"
        />
        {/* 검은색 레이어 */}
        <div className="w-full h-full bg-black bg-opacity-30 fixed -z-10" />
        {/* 음악정보 */}
        <div className="flex flex-col items-center justify-center h-full w-[40%] space-y-4">
          <h1 className="text-4xl text-white drop-shadow-lg">Lovin On Me</h1>
          <p className="text-[#777777] drop-shadow-md">Jack Harlow</p>
          <img
            src="https://i.ibb.co/hLxvjJG/1.jpg"
            alt="1"
            className="w-96 h-96 rounded-md drop-shadow-lg"
          />
          {/* 재생 컨트롤러 */}
          <div className="w-96">
            <div className="flex flex-col items-center mt-6">
              <p className="text-white text-sm self-end">3:36</p>
              <Slider
                aria-label="Volume"
                // value={value}
                // onChange={handleChange}
                size="medium"
                color="secondary"
              />
            </div>
            <div className="flex justify-between">
              <IconButton>
                <MenuIcon color="secondary" fontSize="large" />
              </IconButton>
              <IconButton>
                <SkipPreviousIcon color="secondary" fontSize="large" />
              </IconButton>
              <IconButton>
                <PlayArrowIcon color="secondary" fontSize="large" />
              </IconButton>
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
