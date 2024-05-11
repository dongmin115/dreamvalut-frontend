/* eslint-disable no-unused-vars */

'use client';

import { useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { ThemeProvider } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import AlbumCoverUser from '../components/AlbumCover/AlbumCoverUser.tsx';
import theme from '../styles/theme.ts';
import { fetchAllPlaylist } from '../../api/playlist.ts';

function AllPlayListComponent() {
  const [pageIndex, setPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const { isLoading, data } = useQuery({
    queryKey: ['All Playlist Data', pageIndex],
    queryFn: () => fetchAllPlaylist(pageIndex),
  });

  const handleForwardClick = () => {
    if (data.pageable.page_size - 1 > pageIndex) {
      setPageIndex(pageIndex + 1);
    } // 이때 4는 한번에 보여지는 인기음악의 개수
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div className="flex h-full w-11/12 flex-row items-center justify-start">
        {data.content.map((content: any, index: number) => (
          <AlbumCoverUser
            key={index}
            image1={
              content.tracks[0] === undefined
                ? null
                : content.tracks[0].thumbnail_image
            }
            image2={
              content.tracks[1] === undefined
                ? null
                : content.tracks[1].thumbnail_image
            }
            image3={
              content.tracks[2] === undefined
                ? null
                : content.tracks[2].thumbnail_image
            }
            title={content.playlist_name}
            Id={content.playlist_id}
          />
        ))}
      </div>
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default AllPlayListComponent;
