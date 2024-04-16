/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { ThemeProvider } from '@emotion/react';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from '@tanstack/react-query';
import { getSlideContentStyle } from '@/app/styles/SlideStyles.ts';
import { fetchFollowPlaylistData } from '@/api/playlist.ts';
import Link from 'next/link';
import theme from '../styles/theme.ts';
import AlbumCoverUser from '../components/AlbumCover/AlbumCoverUser.tsx';

function followPlaylistComponent() {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const musicList = [];

  const { isLoading, data } = useQuery({
    queryKey: ['followPlaylistThumbnail'],
    queryFn: fetchFollowPlaylistData,
  });

  const handleForwardClick = () => {
    if (data.length - 6 > pageIndex) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    // 데이터가 존재할 때만 PopularMusic 컴포넌트 생성
    for (let i = 0; i < data.length; i += 1) {
      if (data[i]) {
        // 데이터가 존재하는 경우에만 생성
        musicList.push(
          <Link
            href={`/playlist/${data[i].playlist_name}`} // 플레이리스트 이름으로 링크, 그러나 아이디로 링크할 수도 있음(수정 가능성 있음)
            className="flex w-1/6 items-center justify-center"
          >
            <AlbumCoverUser
              image1={data[i].thumbnails[0]}
              image2={data[i].thumbnails[1]}
              image3={data[i].thumbnails[2]}
              title={data[i].playlist_name}
            />
          </Link>,
        );
      }
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="w-1/12 h-full flex flex-row justify-center items-center opacity-95 z-30 bg-gray-650 rounded-2xl">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div
        className={
          'w-5/6 h-full flex flex-col flex-wrap justify-center items-start slide-content'
        }
        style={getSlideContentStyle(pageIndex, 6)}
      >
        {musicList}
      </div>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 opacity-95 bg-gray-650 rounded-2xl">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default followPlaylistComponent;
