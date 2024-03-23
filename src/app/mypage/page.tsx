/* eslint-disable import/no-named-as-default */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
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

export default function Mypage() {
  const recentSongs = [
    {
      title: 'title1',
      artist: 'artist1',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title2',
      artist: 'artist2',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title3',
      artist: 'artist3',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title4',
      artist: 'artist4',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title5',
      artist: 'artist5',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title6',
      artist: 'artist6',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title7',
      artist: 'artist7',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title8',
      artist: 'artist8',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title9',
      artist: 'artist9',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title10',
      artist: 'artist10',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title11',
      artist: 'artist11',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title12',
      artist: 'artist12',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title13',
      artist: 'artist13',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title13',
      artist: 'artist13',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title13',
      artist: 'artist13',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
    {
      title: 'title13',
      artist: 'artist13',
      cover: 'https://i.ibb.co/hLxvjJG/1.jpg',
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div className="w-screen h-screen pl-[15%] bg-[#1a1a1a] flex flex-col">
        <div className="flex flex-row w-full h-[30%] space-x-6 p-[2%]">
          {/* 내 계정 */}
          <div className="flex flex-col w-[40%] h-full space-y-4">
            <h1 className="text-[#D4D4D4] text-3xl">내 계정</h1>
            <div className="flex flex-row items-center space-x-4 bg-[#353535] w-full h-full rounded-xl p-[4%] justify-between shadow-md">
              <div className="flex flex-row space-x-8">
                <img
                  src="https://i.ibb.co/hLxvjJG/1.jpg"
                  alt="프로필 이미지"
                  className="size-28 rounded-full drop-shadow-sm"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-white text-xl">User name</p>
                  <p className="text-[#777777] text-lg">User email</p>
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                <EditIcon color="secondary" fontSize="small" className="mr-2" />
                프로필 수정
              </Button>
            </div>
          </div>
          {/* 음악취향 */}
          <div className="flex flex-col w-[60%] h-full space-y-4">
            <h1 className="text-[#D4D4D4] text-3xl">나의 음악취향</h1>
            <div className="flex flex-wrap items-center bg-[#353535] w-full h-full rounded-xl p-[2%] shadow-md justify-center gap-2 text-center object-center">
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Jazz
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Rock
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                EDM
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                R&B
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Pop
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Lofi
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Blues
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Latin
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Metal
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Raggae
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Ambient
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Classical
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Funk/Soul
              </Button>
              {/* <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Rap/Hip-Hop
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Folk/Country
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Electronic Dance
              </Button> */}
            </div>
          </div>
        </div>
        {/* 최근 감상한 곡 */}
        <div className="flex flex-col w-full h-full p-[2%] space-y-4">
          <h1 className="text-[#D4D4D4] text-3xl">최근 감상한 곡</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-[#353535] w-full h-full rounded-xl p-[2%] shadow-md">
            {recentSongs.map((e, i) => (
              <div
                key={i}
                className="flex flex-row space-x-4 w-full h-fit hover:bg-[#040404] hover:bg-opacity-30 rounded-lg p-4"
              >
                <img
                  src={e.cover}
                  alt="음악 커버이미지"
                  className="w-16 h-16 rounded-md drop-shadow-lg items-center"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-white text-lg">{e.title}</p>
                  <p className="text-[#777777]">{e.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
