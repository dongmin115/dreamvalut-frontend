/* eslint-disable no-unused-vars */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

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
// 선택한 장르와 선택된 장르를 변경하는 함수
interface Genre {
  genre_id: number;
  genre_name: string;
  state: boolean;
}

export default function Mypage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 변경: loading 상태 타입 명시
  const [error, setError] = useState<any>(null); // 변경: error 상태 타입 명시
  const fetchGenres = async () => {
    try {
      // GET 요청을 보냅니다.
      const response: AxiosResponse<any> = await axios.get(
        '/api/v1/users/preference',
      );
      // 응답 데이터에서 장르 정보를 추출합니다.
      const genresData: Genre[] = response.data.data.genres;
      // 장르 정보를 설정합니다.
      setGenres(genresData);
      setLoading(false); // 변경: 데이터 로딩이 완료되면 loading 상태 변경
    } catch (err) {
      setError(err); // 변경: 에러 처리 수정
      setLoading(false);
    }
  };
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

  const handleGenreToggle = (genreId: number) => {
    // 장르를 토글하여 선택 상태를 변경
    const updatedGenres = genres.map((genre) =>
      genre.genre_id === genreId ? { ...genre, state: !genre.state } : genre,
    );
    setGenres(updatedGenres);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ThemeProvider theme={theme}>
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
              {genres.map((genre) => (
                <Button
                  key={genre.genre_id}
                  variant="contained"
                  color={genre.state ? 'primary' : 'secondary'} // 선택된 장르는 primary 색상, 선택되지 않은 장르는 default 색상
                  className="rounded-full bg-[#6C26FF] text-white"
                  onClick={() => {
                    handleGenreToggle(genre.genre_id);
                    fetchGenres(); // 장르를 토글할 때마다 장르 정보를 다시 가져옵니다.
                  }}
                >
                  {genre.genre_name}
                </Button>
              ))}
              {/* <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                POP
              </Button>
              <Button
                variant="contained"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                R&B
              </Button>
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
                Ballade
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
                Rock
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Hip-Hap
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Folk
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                OST
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                J-POP
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                Musical
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="rounded-full bg-[#6C26FF] text-white"
              >
                EDM
              </Button> */}

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
