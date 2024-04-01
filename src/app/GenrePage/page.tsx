/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './GenrePageCSS.css';

const GenrePage: React.FC = () => {
  const NextPageBtn: React.FC = () => (
    <Link href={'/main'}>
      <button className="fixed right-0 bottom-0 genreBtns w-[8%] h-[12%]">
        <ArrowForwardIosIcon color="primary" fontSize="large" />
      </button>
    </Link>
  );
  const [formats, setFormats] = React.useState(() => [
    'POP',
    'RnB',
    'Jazz',
    'Ballade',
    'Classical',
    'Rock',
    'Hip-Hap',
    'Folk',
    'OST',
    'J-POP',
    'Musical',
    'EDM',
  ]);

  // 버튼 선택시 배경색 변경
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };

  const theme = createTheme({
    palette: {
      primary: {
        // 메인 컬러 보라색
        main: '#7b4ba7',
      },
      secondary: {
        // 흰색
        main: '#ffffff',
      },
    },
  });

  return (
    <>
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        <div className="flex  w-screen h-screen justify-center">
          <div className="z-10 fade-in-box grid grid-cols-3 grid-rows-4 w-[30%] h-screen gap-[3%] p-[2%]">
            <ToggleButton
              value="POP"
              className={
                'flex flex-col w-full items-center text-center justify-center border-2 hover-bg-opacity border-purple-950 rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/QYvMHz3/image.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">POP</p>
            </ToggleButton>
            <ToggleButton
              value="RnB"
              className={
                'flex flex-col w-full items-center text-center justify-center border-2  hover-bg-opacity border-purple-950 rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/pKWSB7k/RNB.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">RnB</p>
            </ToggleButton>
            <ToggleButton
              value="Jazz"
              className={
                'flex flex-col w-full items-center text-center justify-center border-2  hover-bg-opacity border-purple-950  rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/yyFmN1f/image.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">Jazz</p>
            </ToggleButton>
            <ToggleButton
              value="Ballade"
              className={
                'flex flex-col items-center w-full text-center justify-center border-2   hover-bg-opacity border-purple-950 rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/Fwj5D5s/image.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">Ballade</p>
            </ToggleButton>
            <ToggleButton
              value="Classical"
              className={
                'flex flex-col items-center w-full text-center justify-center border-2   hover-bg-opacity border-purple-950  rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/nwnkLDJ/image.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">Classical</p>
            </ToggleButton>
            <ToggleButton
              value="Rock"
              className={
                'flex flex-col w-full items-center text-center justify-center border-2  hover-bg-opacity border-purple-950  rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/3cjmtvN/image.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">Rock</p>
            </ToggleButton>
            <ToggleButton
              value="Hip-Hap"
              className={
                'flex flex-col items-center w-full text-center justify-center border-2  hover-bg-opacity border-purple-950  rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/ZHJLj11/image.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">Hip-Hap</p>
            </ToggleButton>
            <ToggleButton
              value="Folk"
              className={
                'flex flex-col items-center text-center w-full justify-center border-2  hover-bg-opacity border-purple-950  rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/Bq4w6f9/Folk.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">Folk</p>
            </ToggleButton>
            <ToggleButton
              value="OST"
              className={
                'flex flex-col items-center text-center w-full justify-center border-2  hover-bg-opacity border-purple-950  rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/HYCZ8KS/OST.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">OST</p>
            </ToggleButton>
            <ToggleButton
              value="J-POP"
              className={
                'flex flex-col items-center text-center w-full justify-center border-2  hover-bg-opacity border-purple-950  rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/cgVFWw1/JPOP.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">J-POP</p>
            </ToggleButton>
            <ToggleButton
              value="Musical"
              className={
                'flex flex-col items-center w-full text-center justify-center border-2  hover-bg-opacity border-purple-950  rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/cgP2r1p/image.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">Musical</p>
            </ToggleButton>
            <ToggleButton
              value="EDM"
              className={
                'flex flex-col items-center text-center w-full justify-center border-2 hover-bg-opacity border-purple-950 rounded-xl'
              }
            >
              <img
                src="https://i.ibb.co/CvC2VdF/EDM.png"
                alt="image"
                className="w-[90%] h-[70%] rounded-full"
              />
              <p className="text-zinc-50 mt-[8%] text-xl">EDM</p>
            </ToggleButton>
          </div>
        </div>
      </ToggleButtonGroup>
      <div className=""></div>
      <p className="absolute fade-in-box2 left-0 top-[45%] text-violet-900 opacity-[100%] text-8xl">
        Genre.
      </p>
      <div className="absolute fade-in-box2 left-[1%] bottom-[44%] w-[98%] h-[1%] rounded-md bg-violet-950 opacity-[100%]"></div>
      <ThemeProvider theme={theme}>
        <NextPageBtn />
      </ThemeProvider>
    </>
  );
};

export default GenrePage;
