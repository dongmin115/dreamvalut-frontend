/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { ThemeProvider } from '@emotion/react';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from '@tanstack/react-query';
import { getSlideContentStyle } from '@/app/styles/slide.ts';
import theme from '../styles/theme.ts';
import AlbumCoverSystem from '../components/AlbumCover/AlbumCoverSystem.tsx';

function systemPlaylistComponent() {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [data, setData] = useState<any>([]);

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

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center rounded-2xl opacity-95">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div className="flex h-full w-10/12 flex-row items-center justify-start rounded-2xl"></div>
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center rounded-2xl opacity-95">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default systemPlaylistComponent;
