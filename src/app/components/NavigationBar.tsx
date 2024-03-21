import React from 'react';
import '../styles/NavBar.css';
import Link from 'next/link';

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

const NavBar: React.FC = () => (
  <div className="fixed left-0 top-0 h-full bg-black opacity-90 text-white p-4">
    <div className="flex items-center mt-5">
      <div className="bg-purple-500 w-10 h-10 rounded-full"></div>
      <h2 className="p-3">DreamVault</h2>
    </div>
    <div className="mt-20">
      <div className="flex items-center rounded-lg hover:bg-gray-900 cursor-pointer">
        <div className="bg-gray-500 w-8 h-8 rounded-full"></div>
        <Home>
          <button className="p-5 ">Home</button>
        </Home>
      </div>
      <div className="flex items-center rounded-lg hover:bg-gray-900 cursor-pointer">
        <div className="bg-gray-500 w-8 h-8 rounded-full"></div>
        <Playlist
          title="내 플레이리스트"
          songs={['노래 1', '노래 2', '노래 3']}
        >
          <button className="p-5">플레이리스트</button>
        </Playlist>
      </div>
      <div className="flex items-center rounded-lg hover:bg-gray-900 cursor-pointer">
        <div className="bg-gray-500 w-8 h-8 rounded-full"></div>
        <Mymusic>
          <button className="p-5">나만의 음악 등록</button>
        </Mymusic>
      </div>
      <div className="flex items-center rounded-lg hover:bg-gray-900 cursor-pointer">
        <div className="bg-gray-500 w-8 h-8 rounded-full"></div>
        <UserProfile>
          <button className="p-5">프로필</button>
        </UserProfile>
      </div>
      <div className="flex items-center rounded-lg hover:bg-gray-900 cursor-pointer">
        <div className="bg-gray-500 w-8 h-8 rounded-full"></div>
        <UserProfile>
          <button className="p-5">
            <Link href={'/musicpage'}>음악 상세페이지 (임시)</Link>
          </button>
        </UserProfile>
      </div>
    </div>
    <div className="flex items-center rounded-lg">
      <LogOut>
        <div className="bg-gray-500 w-8 h-8 absolute bottom-1 right-20 rounded-full"></div>
        <button className="absolute bottom-0 right-0 w-20 h-10 hover-bg-gradient">
          로그아웃
        </button>
      </LogOut>
    </div>
  </div>
);

export default NavBar;
