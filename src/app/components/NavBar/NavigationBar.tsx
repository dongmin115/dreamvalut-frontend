/* eslint-disable import/no-extraneous-dependencies */
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
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import logout from '@/api/logout.ts';
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
              <IconButton>
                <InputAdornment position="start">
                  <SearchIcon color="primary" className="-ml-3 w-[1.1rem]" />
                </InputAdornment>
              </IconButton>
            </Link>
          ),
          className:
            'text-white bg-[#353535] justify-start h-10 text-xs lg:text-sm mb-1',
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
        <MenuButton className="inline-flex w-full justify-center rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm">
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
  const router = useRouter();
  if (ignorePath().includes(path)) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-full w-20 lg:w-60" />
      <div className="fixed z-40 flex h-full w-20 flex-shrink-0 flex-grow flex-col bg-zinc-900 p-2 text-white lg:w-60 lg:justify-start lg:p-4">
        <Link
          className="flex w-full cursor-pointer flex-col items-center lg:items-start"
          href={'/main'}
        >
          <div className="mt-5 flex items-center">
            <img
              src="https://i.ibb.co/1GnSm8z/Dream-Vault-Png.png"
              alt="DreamVault-logo-img"
              className="w-8"
            />
            <div className="relative flex items-center justify-start">
              <h1 className="hide-text md:text-1xl p-2 text-xl font-bold sm:text-[10px] lg:text-[18px]">
                DreamVault
              </h1>
              <h6 className="hide-text -mt-4 flex text-xs sm:text-[8px] lg:text-[10px]">
                Beta
              </h6>
            </div>
          </div>
        </Link>
        <div className="mt-6 flex h-full w-full flex-col">
          <div className="hidden w-full lg:mb-8 lg:block">
            <span className="hide-text">
              <SearchAppBar />
            </span>
          </div>
          <div className="hover-bg-opacity flex w-full cursor-pointer flex-col items-center justify-center rounded-lg py-1 lg:hidden">
            <ToggleSearchbar />
            <p className="text-[0.5rem] lg:hidden">검색</p>
          </div>
          {/* 일부 화면 크기에서 검색 아이콘 사라지는것 방지 */}
          <div className="show-searchbar mb-10 hidden">
            <ToggleSearchbar />
          </div>
          <Link
            href={'/main'}
            className="hover-bg-opacity flex w-full cursor-pointer flex-col items-center justify-center rounded-lg py-1 lg:flex-row lg:justify-start lg:p-2"
          >
            <HomeIcon color="primary" />
            <p className="pt-2 text-[0.5rem] lg:ml-4 lg:pt-0 lg:text-sm">홈</p>
          </Link>

          <Link
            className="hover-bg-opacity flex w-full cursor-pointer flex-col items-center justify-center rounded-lg py-1 lg:flex-row lg:justify-start lg:p-2"
            href={'/playlist'}
          >
            <PlaylistPlayIcon color="primary" />
            <p className="pt-2 text-[0.5rem] lg:ml-4 lg:pt-0 lg:text-sm">
              플레이리스트
            </p>
          </Link>

          <Link
            href={'/post_music'}
            className="hover-bg-opacity flex w-full cursor-pointer flex-col items-center justify-center rounded-lg py-1 lg:flex-row lg:justify-start lg:p-2"
          >
            <EditNoteIcon color="primary" />
            <p className="pt-2 text-[0.5rem] lg:ml-4 lg:pt-0 lg:text-sm">
              음악 등록
            </p>
          </Link>

          <Link
            href={'/mypage'}
            className="hover-bg-opacity flex w-full cursor-pointer flex-col items-center justify-center rounded-lg py-1 lg:flex-row lg:justify-start lg:p-2"
          >
            <PersonIcon color="primary" />
            <p className="pt-2 text-[0.5rem] lg:ml-4 lg:pt-0 lg:text-sm">
              프로필
            </p>
          </Link>
        </div>

        <div className="my-4 flex flex-col">
          <div className="hover-bg-opacity m-1 flex items-center rounded-lg text-sm">
            <MeetingRoomIcon color="primary" />
            <button
              className="hidden p-2 sm:block lg:text-sm"
              onClick={() => {
                logout().then(() => {
                  router.push('/login');
                });
              }}
            >
              <p className="hide-text">로그아웃</p>
            </button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default NavigationBar;
