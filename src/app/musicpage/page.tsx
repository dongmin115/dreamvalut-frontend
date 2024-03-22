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

import NavBar from '../components/NavBar/NavigationBar';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="w-screen h-screen flex flex-row justify-around">
        <NavBar />
        {/* 블러배경 */}
        <img
          src="https://i.ibb.co/hLxvjJG/1.jpg"
          alt="1"
          className="w-full h-full blur -z-10 fixed"
        />
        {/* 음악정보 */}
        <div className="flex flex-col items-center justify-center h-full w-[30%] ml-[20%] space-y-4">
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
          <div className="flex flex-row justify-between w-full">
            <h1 className="text-4xl text-white drop-shadow-lg self-start">
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
              <MenuItem onClick={handleClose}>재생목록 1</MenuItem>
              <MenuItem onClick={handleClose}>재생목록 2</MenuItem>
              <MenuItem onClick={handleClose}>재생목록 3</MenuItem>
            </Menu>
          </div>
          <Divider
            variant="fullWidth"
            orientation="horizontal"
            flexItem
            className="w-full bg-white drop-shadow-xl"
          />
          <li className="flex flex-row space-x-4 self-start hover:bg-[#040404] hover:bg-opacity-30 hover:rounded-md w-full p-2">
            <img
              src="https://i.ibb.co/hLxvjJG/1.jpg"
              alt="음악 커버이미지"
              className="w-16 h-16 rounded-md drop-shadow-lg"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="text-white text-lg">music title</p>
              <p className="text-[#777777]">artist name</p>
            </div>
          </li>
          <li className="flex flex-row space-x-4 self-start hover:bg-[#040404] hover:bg-opacity-30 hover:rounded-md w-full p-2">
            <img
              src="https://i.ibb.co/hLxvjJG/1.jpg"
              alt="음악 커버이미지"
              className="w-16 h-16 rounded-md drop-shadow-lg"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="text-white text-lg">music title</p>
              <p className="text-[#777777]">artist name</p>
            </div>
          </li>
          <li className="flex flex-row space-x-4 self-start hover:bg-[#040404] hover:bg-opacity-30 hover:rounded-md w-full p-2">
            <img
              src="https://i.ibb.co/hLxvjJG/1.jpg"
              alt="음악 커버이미지"
              className="w-16 h-16 rounded-md drop-shadow-lg"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="text-white text-lg">music title</p>
              <p className="text-[#777777]">artist name</p>
            </div>
          </li>
          <li className="flex flex-row space-x-4 self-start hover:bg-[#040404] hover:bg-opacity-30 hover:rounded-md w-full p-2">
            <img
              src="https://i.ibb.co/hLxvjJG/1.jpg"
              alt="음악 커버이미지"
              className="w-16 h-16 rounded-md drop-shadow-lg"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="text-white text-lg">music title</p>
              <p className="text-[#777777]">artist name</p>
            </div>
          </li>
          <li className="flex flex-row space-x-4 self-start hover:bg-[#040404] hover:bg-opacity-30 hover:rounded-md w-full p-2">
            <img
              src="https://i.ibb.co/hLxvjJG/1.jpg"
              alt="음악 커버이미지"
              className="w-16 h-16 rounded-md drop-shadow-lg"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="text-white text-lg">music title</p>
              <p className="text-[#777777]">artist name</p>
            </div>
          </li>
          <li className="flex flex-row space-x-4 self-start hover:bg-[#040404] hover:bg-opacity-30 hover:rounded-md w-full p-2">
            <img
              src="https://i.ibb.co/hLxvjJG/1.jpg"
              alt="음악 커버이미지"
              className="w-16 h-16 rounded-md drop-shadow-lg"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="text-white text-lg">music title</p>
              <p className="text-[#777777]">artist name</p>
            </div>
          </li>
        </div>
      </div>
    </ThemeProvider>
  );
}
