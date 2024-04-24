/* eslint-disable no-unused-vars */

'use client';

import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from '@tanstack/react-query';
import { fetchSystemPlaylist } from '@/api/playlist.ts';
import theme from '../styles/theme.ts';
import AlbumCoverSystem from '../components/AlbumCover/AlbumCoverSystem.tsx';

function SystemPlaylistComponent() {
  const [pageIndex, setPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const { isLoading, data } = useQuery({
    queryKey: ['System Playlist Data', pageIndex], // pageIndex를 queryKey에 추가
    queryFn: () => fetchSystemPlaylist(pageIndex),
  });

  const handleForwardClick = () => {
    if (data.total_pages - 1 > pageIndex) {
      setPageIndex(pageIndex + 1);
    } // 이때 4는 한번에 보여지는 인기음악의 개수
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div className="w-11/12 h-full flex flex-row justify-start items-start">
        {data.content.map((content: any, index: number) => (
          <AlbumCoverSystem
            key={index}
            image={content.tracks[0].thumbnail_image}
            title={content.playlist_name}
            Id={content.playlist_id}
          />
        ))}
      </div>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default SystemPlaylistComponent;
