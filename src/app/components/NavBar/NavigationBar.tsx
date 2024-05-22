/* eslint-disable import/no-unresolved */
/* eslint-disable @next/next/no-img-element */

'use client';

import React from 'react';
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
import theme from '../../styles/theme.ts';

// 각각의 컴포넌트에 대한 타입 선언
type HomeProps = {
  children: React.ReactNode;
};

type PlaylistProps = {
  title: string;
  songs: string[];
  children?: React.ReactNode;
};

type MymusicProps = {
  children: React.ReactNode;
};

type UserProfileProps = {
  children: React.ReactNode;
};

type LogOutProps = {
  children: React.ReactNode;
};

export function SearchAppBar() {
  const router = useRouter();
  const [keyward, setKeyward] = React.useState('');

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
              <IconButton style={{ padding: '0px' }}>
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              </IconButton>
            </Link>
          ),
          style: {
            color: 'white',
            backgroundColor: '#353535',
            height: '5vh',
            fontSize: '1rem',
            marginBottom: '3rem',
          },
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

// 각각의 컴포넌트 구현
const Home: React.FC<HomeProps> = ({ children }) => <div>{children}</div>;

const Playlist: React.FC<PlaylistProps> = ({ children }) => (
  <div>{children}</div>
);

const Mymusic: React.FC<MymusicProps> = ({ children }) => <div>{children}</div>;

const UserProfile: React.FC<UserProfileProps> = ({ children }) => (
  <div>{children}</div>
);

const LogOut: React.FC<LogOutProps> = ({ children }) => <div>{children}</div>;

function NavigationBar() {
  const path = usePathname();
  if (ignorePath().includes(path)) {
    return null;
  }
  return (
    <div className="fixed left-0 top-0 flex h-full w-[15%] flex-col justify-start bg-zinc-900 p-4 text-white">
      <Link className="flex cursor-pointer flex-col" href={'/main'}>
        <div className="mt-5 flex flex-row items-center">
          <img
            src="https://i.ibb.co/1GnSm8z/Dream-Vault-Png.png"
            alt="DreamVault-logo-img"
            className="w-12"
          />
          <h2 className="pl-3 text-2xl font-bold">DreamVault</h2>
          <h6 className="-mt-4 p-2 text-xs">Beta</h6>
        </div>
      </Link>

      <div className="mt-12 flex h-full flex-col">
        <SearchAppBar />
        <Link
          href={'/main'}
          className="hover-bg-opacity mb-5 flex cursor-pointer flex-row items-center rounded-lg"
        >
          <HomeIcon style={{ color: theme.palette.primary.main }} />
          <p className="p-2 text-sm">홈</p>
        </Link>

        <Link
          className="hover-bg-opacity mb-5 flex cursor-pointer items-center rounded-lg"
          href={'/playlist'}
        >
          <Playlist
            title="내 플레이리스트"
            songs={['노래 1', '노래 2', '노래 3']}
          >
            <PlaylistPlayIcon style={{ color: theme.palette.primary.main }} />
            <button className="p-2 text-sm">플레이리스트</button>
          </Playlist>
        </Link>

        <Link href={'/post_music'}>
          <div className="hover-bg-opacity mb-5 flex cursor-pointer items-center rounded-lg">
            <Mymusic>
              <EditNoteIcon style={{ color: theme.palette.primary.main }} />
              <button className="p-2 text-sm">나만의 음악 등록</button>
            </Mymusic>
          </div>
        </Link>

        <div className="hover-bg-opacity mb-5 flex cursor-pointer items-center rounded-lg">
          <PersonIcon style={{ color: theme.palette.primary.main }} />
          <UserProfile>
            <button className="p-2 text-sm">
              <Link href={'/mypage'}>프로필</Link>
            </button>
          </UserProfile>
        </div>
      </div>

      <div className="my-4 flex flex-col">
        <div className="hover-bg-opacity flex items-center rounded-lg text-sm">
          <LogOut>
            <MeetingRoomIcon style={{ color: theme.palette.primary.main }} />
            <button className="text-sx p-2">로그아웃</button>
          </LogOut>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
