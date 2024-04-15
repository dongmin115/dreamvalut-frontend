/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { ThemeProvider } from '@emotion/react';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from '@tanstack/react-query';
import { getSlideContentStyle } from '@/app/styles/SlideStyles.ts';
import theme from '../styles/theme.ts';
import AlbumCoverSystem from '../components/AlbumCover/AlbumCoverSystem.tsx';

function systemPlaylistComponent() {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const handleForwardClick = () => {
    if (data.length - 4 > pageIndex) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="w-1/12 h-full flex flex-row justify-center items-center opacity-95 z-30 bg-gray-650 rounded-2xl">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div className="w-11/12 h-full flex flex-row items-center justify-start">
        <AlbumCoverSystem
          image="https://i.ibb.co/ZVGLMxS/wecan-tbefriends.jpg"
          title="Billboard Hot 100"
        />

        <AlbumCoverSystem
          image="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
          title="가사 AI 노래 Top 100"
        />
      </div>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 opacity-95 bg-gray-650 rounded-2xl">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default systemPlaylistComponent;
