/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { ThemeProvider } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from '@tanstack/react-query';
import { getSlideContentStyle } from '@/app/styles/slide.ts';
import { fetchFollowPlaylistData } from '@/api/playlist.ts';
import theme from '../styles/theme.ts';
import AlbumCoverUser from '../components/AlbumCover/AlbumCoverUser.tsx';

function FollowPlaylist() {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const musicList = [];
  const divRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const { isLoading, data } = useQuery({
    queryKey: ['FollowPlaylistThumbnail'],
    queryFn: fetchFollowPlaylistData,
  });

  const handleForwardClick = () => {
    if (isVisible) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.5, // 10% 가시성을 기준으로 설정
      },
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [divRef.current]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data.content) {
    // 데이터가 존재할 때만 PopularMusic 컴포넌트 생성
    for (let i = 0; i < data.content.length; i += 1) {
      if (data.content[i]) {
        // 데이터가 존재하는 경우에만 생성
        musicList.push(
          <div key={i}>
            <AlbumCoverUser
              image1={data.content[i].thumbnails[0]}
              image2={data.content[i].thumbnails[1]}
              image3={data.content[i].thumbnails[2]}
              title={data.content[i].playlist_name}
              id={data.content[i].playlist_id}
            />
          </div>,
        );
      }
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-zinc-650 z-30 flex h-full w-10 items-center justify-center first-letter:flex-row">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div
        className={
          'slide-content flex h-full w-full flex-col flex-wrap items-start justify-center'
        }
        style={getSlideContentStyle(pageIndex, 3)}
      >
        {musicList}
        <div ref={divRef} />
      </div>
      <div className="bg-zinc-650 z-30 flex h-full w-10 flex-row items-center justify-center">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default FollowPlaylist;
