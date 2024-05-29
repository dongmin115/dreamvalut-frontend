/* eslint-disable import/no-unresolved */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home'; // 홈 아이콘
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'; // 플리 아이콘
import EditNoteIcon from '@mui/icons-material/EditNote'; // 나만의 음악 등록 아이콘
import PersonIcon from '@mui/icons-material/Person'; // 프로필 아이콘
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'; // 로그아웃 아이콘
import {
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import ignorePath from '@/types/ignorePath.ts';
import { LogOut } from '@/util/login.ts';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import theme from '../../styles/theme.ts';

export function SearchAppBar() {
  const router = useRouter();
  const [keyward, setKeyward] = useState('');

  const handleKeyward = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyward(e.target.value);
  };
  // Enter키로 검색하는 함수
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchUrl = `/search/${encodeURIComponent(keyward)}`;
      router.push(searchUrl);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <Link href={`/search/${keyward}`}>
              <IconButton className="-ml-1 p-0">
                <InputAdornment position="start">
                  <SearchIcon color="primary" className="w-[1.1rem]" />
                </InputAdornment>
              </IconButton>
            </Link>
          ),
          className:
            'text-white bg-[#353535] h-[5vh] text-xs sm:text-[10px] md:text-xs lg:text-sm mb-[3rem]',
        }}
        variant="outlined"
        value={keyward}
        onChange={handleKeyward}
        onKeyDown={handleKeyPress}
        color="primary"
        placeholder="검색"
      />
    </ThemeProvider>
  );
}

export function ToggleSearchbar() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="-ml-2 inline-flex w-full justify-center rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm">
          <SearchIcon color="primary" />
        </MenuButton>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 -translate-x-full"
        enterTo="transform opacity-100 translate-x-0"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 translate-x-0"
        leaveTo="transform opacity-0 -translate-x-full"
      >
        <MenuItems className="absolute left-[5rem] top-0 mt-2 h-[2rem] w-[12rem] origin-top-right bg-gray-800 focus:outline-none">
          <div className="h-[3.4rem] rounded bg-violet-900 bg-opacity-70 pl-2 pr-2 pt-2">
            <MenuItem>{() => <SearchAppBar />}</MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

function NavigationBar() {
  const path = usePathname();
  if (ignorePath().includes(path)) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="width5 fixed left-0 top-0 z-40 flex h-full w-[5rem] flex-col justify-start bg-zinc-900 p-4 text-white sm:w-[5rem] md:w-[8rem] lg:w-[12.5rem]">
        <Link className="flex cursor-pointer flex-col" href={'/main'}>
          <div className="mt-5 flex items-center">
            <img
              src="https://i.ibb.co/1GnSm8z/Dream-Vault-Png.png"
              alt="DreamVault-logo-img"
              className="w-[10rem] sm:w-[10rem] md:w-1/3 lg:w-1/3"
            />
            <div className="relative">
              <h2 className="text-1xl hide-text md:text-1xl p-3 font-bold sm:text-[10px] lg:text-[18px]">
                DreamVault
              </h2>

              <h6 className="hide-text absolute left-2 top-5 -translate-y-full p-1 text-xs sm:text-[8px] lg:text-[10px]">
                Beta
              </h6>
            </div>
          </div>
        </Link>
        <div className="mt-12 flex h-full flex-col">
          <div className="hidden sm:hidden md:block lg:block">
            <span className="hide-text">
              <SearchAppBar />
            </span>
          </div>
          <div className="mb-10 block sm:block md:hidden lg:hidden">
            <ToggleSearchbar />
          </div>
          {/* 일부 화면 크기에서 검색 아이콘 사라지는것 방지 */}
          <div className="show-searchbar mb-10 hidden">
            <ToggleSearchbar />
          </div>
          <Link href={'/main'}>
            <div className="hover-bg-opacity mb-5 flex cursor-pointer items-center rounded-lg">
              <HomeIcon color="primary" />
              <button className="hidden p-2 sm:block sm:text-[10px] md:block lg:text-sm">
                <span className="hide-text">홈</span>
              </button>
            </div>
          </Link>

          <Link
            className="hover-bg-opacity mb-5 flex cursor-pointer items-center rounded-lg"
            href={'/playlist'}
          >
            <PlaylistPlayIcon color="primary" />
            <button className="hidden p-2 sm:block sm:text-[10px] md:block lg:text-sm">
              <span className="hide-text">플레이리스트</span>
            </button>
          </Link>

          <Link href={'/post_music'}>
            <div className="hover-bg-opacity mb-5 flex cursor-pointer items-center rounded-lg">
              <EditNoteIcon color="primary" />
              <button className="hidden p-2 sm:block sm:text-[8px] md:block lg:text-sm">
                <span className="hide-text">나만의 음악 등록</span>
              </button>
            </div>
          </Link>

          <Link href={'/mypage'}>
            <div className="hover-bg-opacity mb-5 flex cursor-pointer items-center rounded-lg">
              <PersonIcon color="primary" />
              <button className="hidden p-2 sm:block sm:text-[10px] md:block lg:text-sm">
                <span className="hide-text">프로필</span>
              </button>
            </div>
          </Link>
        </div>

        <div className="my-4 flex flex-col">
          <div className="hover-bg-opacity flex items-center rounded-lg text-sm">
            <MeetingRoomIcon color="primary" />
            <button
              className="hidden p-2 sm:block sm:text-[10px] md:block lg:text-sm"
              onClick={LogOut}
            >
              <span className="hide-text">로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default NavigationBar;
