/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { ThemeProvider } from '@emotion/react';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from '@tanstack/react-query';
import { getSlideContentStyle } from '@/app/styles/slide.ts';
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
    if (data.content.length - 6 > pageIndex) {
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

  if (data.content) {
    // 데이터가 존재할 때만 PopularMusic 컴포넌트 생성
    for (let i = 0; i < data.content.length; i += 1) {
      if (data.content[i]) {
        // 데이터가 존재하는 경우에만 생성
        musicList.push(
          <Link
            href={`/playlist/${data.content[i].playlist_Id}`} // 플레이리스트 이름으로 링크, 그러나 아이디로 링크할 수도 있음(수정 가능성 있음)
            className="flex w-1/6 items-center justify-center"
          >
            <AlbumCoverUser
              image1={data.content[i].thumbnails[0]}
              image2={data.content[i].thumbnails[1]}
              image3={data.content[i].thumbnails[2]}
              title={data.content[i].playlist_name}
              Id={data.content[i].playlist_id}
            />
          </Link>,
        );
      }
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center rounded-2xl opacity-95">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div
        className={
          'slide-content flex h-full w-5/6 flex-col flex-wrap items-start justify-center'
        }
        style={getSlideContentStyle(pageIndex, 6)}
      >
        {musicList}
      </div>
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center rounded-2xl opacity-95">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default followPlaylistComponent;
