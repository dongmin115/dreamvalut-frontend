/* eslint-disable function-paren-newline */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */

'use client';

import { useEffect, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { ThemeProvider } from '@emotion/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSlideContentStyle } from '@/app/styles/slide.ts';
import { fetchSystemPlaylist } from '@/api/playlist.ts';
import AlbumCoverSystem from '../components/AlbumCover/AlbumCoverSystem.tsx';
import theme from '../styles/theme.ts';

function SystemPlaylist() {
  const [pageIndex, setPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const [isVisible, setIsVisible] = useState(true);
  const divRef = useRef(null);

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
        threshold: 0.1, // 10% 가시성을 기준으로 설정
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
  }, []);

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['System Playlists Data'], // pageIndex를 queryKey에 추가
    queryFn: ({ pageParam = 0 }) => fetchSystemPlaylist(pageParam),
    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      // if (!lastPage.last && !lastPage.empty) {
      if (!lastPage.last) {
        return lastPage.pageable.page_number + 1;
      }
      return undefined;
    },
  });

  const handleForwardClick = () => {
    fetchNextPage();
    if (isVisible) {
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
      <div className="z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div
        className="flex h-full w-11/12 flex-row items-center justify-start"
        style={getSlideContentStyle(pageIndex, 3)}
      >
        {data?.pages.map((page: any, pageIndex) =>
          page?.content.map((playlist: any, index: any) => (
            <AlbumCoverSystem
              key={pageIndex * 6 + index}
              image={playlist.tracks[0].thumbnail_image}
              title={playlist.playlist_name}
              Id={playlist.playlist_id}
              curation="SystemPlaylist"
            />
          )),
        )}
        <div ref={divRef} />
      </div>
      <div className="z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default SystemPlaylist;
