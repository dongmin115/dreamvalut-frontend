/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const GenrePage: React.FC = () => {
  const NextPageBtn: React.FC = () => (
    <Link href={'/musicpage'}>
      <button className="fixed right-0 bottom-0 genreBtns w-[8%] h-[12%]">
        <ArrowForwardIosIcon color="primary" fontSize="large" />
      </button>
    </Link>
  );

  const theme = createTheme({
    palette: {
      primary: {
        // 메인 컬러 보라색
        main: '#6a1b9a',
      },
      secondary: {
        // 흰색
        main: '#ffffff',
      },
    },
  });

  return (
    <>
      <div className="flex justify-center">
        <div className="z-10 fade-in-box grid grid-cols-3 grid-rows-4 w-[30%] h-screen gap-[3%] p-[2%]">
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/QYvMHz3/image.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">POP</p>
          </button>
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/pKWSB7k/RNB.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">RnB</p>
          </button>
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/yyFmN1f/image.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">Jazz</p>
          </button>
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/Fwj5D5s/image.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">Ballade</p>
          </button>
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/nwnkLDJ/image.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">Classical</p>
          </button>
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/3cjmtvN/image.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">Rock</p>
          </button>
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/ZHJLj11/image.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">Hip-Hap</p>
          </button>
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/Bq4w6f9/Folk.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">Folk</p>
          </button>
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/HYCZ8KS/OST.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">OST</p>
          </button>
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/cgVFWw1/JPOP.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">J-POP</p>
          </button>
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/cgP2r1p/image.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">Musical</p>
          </button>
          <button
            className={
              'genreBtns flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl'
            }
          >
            <img
              src="https://i.ibb.co/CvC2VdF/EDM.png"
              alt="image"
              className="w-[90%] h-[70%] rounded-full"
            />
            <p className="text-zinc-50 mt-[8%] text-xl">EDM</p>
          </button>
        </div>
      </div>
      <div className=""></div>
      <div className="absolute fade-in-box2 left-0 top-[45%] text-violet-900 opacity-[70%] text-8xl">
        Genre.
      </div>
      <div className="absolute fade-in-box2 left-[1%] bottom-[43%] w-[98%] h-[1%] rounded-md bg-violet-900 opacity-[40%]"></div>
      <ThemeProvider theme={theme}>
        <NextPageBtn />
      </ThemeProvider>
    </>
  );
};

export default GenrePage;
