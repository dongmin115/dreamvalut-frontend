'use client';

import { Suspense, useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { GenreData } from '@/types/genre.ts';
import Image from 'next/image';
import theme from '@/app/styles/theme.ts';
import { fetchGenres, postGenreTaste } from '../../api/genre.ts';

const GenrePageContent = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [genres, setGenres] = useState<GenreData[]>([]); // 변경: genres 상태 타입 수정
  const router = useRouter();

  const handleGenreToggle = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const { data } = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
  });

  // 받아온 데이터 세팅
  useEffect(() => {
    if (data) {
      setGenres(data);
    }
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup orientation="vertical" value={selectedGenres}>
        <div className="flex h-screen w-screen items-center justify-center overflow-y-auto">
          <div className="flex h-screen max-w-[30rem] flex-wrap items-center justify-center">
            {genres.map((genre) => (
              <div
                key={genre.genre_id}
                className="z-10 flex h-1/5 max-h-[10rem] w-1/3 p-2"
              >
                <ToggleButton
                  value={genre.genre_id}
                  onClick={() => {
                    handleGenreToggle(genre.genre_id);
                  }}
                  className={`fade-in-box hover-bg-opacity flex h-full w-full flex-col text-center ${selectedGenres.includes(genre.genre_id) ? '#341672' : ''}`}
                  style={{
                    border: selectedGenres.includes(genre.genre_id)
                      ? '1px solid #280E52'
                      : '1px solid #4E4B54',
                    backgroundColor: selectedGenres.includes(genre.genre_id)
                      ? '#280E52'
                      : '#1a1a1a',
                    borderRadius: '15%',
                  }}
                >
                  <div className="relative mx-auto flex h-4/5 w-4/5">
                    <Image
                      src={genre.genre_image}
                      alt="genre-thumbnail"
                      className="rounded-full"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p className="mt-[15%] text-xs text-white sm:text-sm">
                    {genre.genre_name}
                  </p>
                </ToggleButton>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-in-box2 absolute left-0 top-[45%] z-10 text-violet-900 opacity-[100%]">
          <p className="text-7xl opacity-45 sm:text-8xl sm:opacity-45 md:opacity-45 lg:opacity-100 ">
            Genre.
          </p>
        </div>
        <div className="fade-in-box2 absolute bottom-[43%] left-[1%] z-0 h-[1%] w-[98%] rounded-md bg-violet-950 opacity-45 sm:opacity-45 md:opacity-45 lg:opacity-100"></div>
      </ToggleButtonGroup>
      {/* 다음 페이지로 이동하는 버튼 */}
      <button
        className="svg-wrapper fixed bottom-0 right-0 ml-2 mr-2 mt-0 inline-block h-[40px] w-[150px] rounded"
        onClick={async () => {
          await postGenreTaste(selectedGenres).then(() => {
            router.push('/main');
          });
        }}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <rect
            id="shape"
            className="h-full w-full fill-transparent stroke-[#5e22cf] stroke-[6px] text-indigo-600"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white"
          >
            NEXT
          </text>
        </svg>
      </button>
    </ThemeProvider>
  );
};

const GenrePage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <GenrePageContent />
  </Suspense>
);

export default GenrePage;
