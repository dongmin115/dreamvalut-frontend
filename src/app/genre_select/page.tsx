'use client';

import { Suspense, useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
        <div>
          <div className="flex h-screen w-screen items-center justify-center">
            <div className="z-10 grid h-screen w-[30%] grid-cols-3 grid-rows-5 gap-4 p-[1%]">
              {genres.map((genre) => (
                <div key={genre.genre_id} className="w-full">
                  <ToggleButton
                    value={genre.genre_id}
                    onClick={() => {
                      handleGenreToggle(genre.genre_id);
                    }}
                    className={`fade-in-box hover-bg-opacity flex h-full w-full flex-col text-center ${selectedGenres.includes(genre.genre_id) ? '#341672' : ''}`}
                    style={{
                      border: selectedGenres.includes(genre.genre_id)
                        ? '1px solid #8b5cf6'
                        : '1px solid #8b5cf6',
                      backgroundColor: selectedGenres.includes(genre.genre_id)
                        ? '#2e1065'
                        : '#1a1a1a',
                      borderRadius: '15%',
                    }}
                  >
                    <div className="relative flex h-4/5 w-4/5">
                      <Image
                        src={genre.genre_image}
                        alt="genre-thumbnail"
                        className="rounded-full"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <p className="mt-[15%] text-sm text-white">
                      {genre.genre_name}
                    </p>
                  </ToggleButton>
                </div>
              ))}
            </div>
          </div>
          <div className="fade-in-box2 absolute left-0 top-[45%] z-10 text-violet-900 opacity-[100%]">
            <p className="text-8xl">Genre.</p>
          </div>
          <div className="fade-in-box2 absolute bottom-[43%] left-[1%] z-0 h-[1%] w-[98%] rounded-md bg-violet-950 opacity-[100%]"></div>
        </div>
      </ToggleButtonGroup>
      {/* 다음 페이지로 이동하는 버튼 */}
      <div>
        <button
          className="genreBtns fixed bottom-0 right-0 h-[12%] w-[8%]"
          onClick={async () => {
            await postGenreTaste(selectedGenres).then(() => {
              router.push('/main');
            });
          }}
        >
          <ArrowForwardIosIcon color="primary" fontSize="large" />
        </button>
      </div>
    </ThemeProvider>
  );
};

// options: ClientSearchParamSetterOptions
const GenrePage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    {/* <GenrePageContent {...options} /> */}
    <GenrePageContent />
  </Suspense>
);

export default GenrePage;
