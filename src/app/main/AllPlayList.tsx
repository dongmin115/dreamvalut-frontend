/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

'use client';

import { useEffect, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { ThemeProvider } from '@emotion/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSlideContentStyle } from '@/app/styles/slide.ts';
import AlbumCoverUser from '../components/AlbumCover/AlbumCoverUser.tsx';
import theme from '../styles/theme.ts';
import { fetchAllPlaylist } from '../../api/playlist.ts';

function AllPlayListComponent() {
  const [pageIndex, setPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const [isVisible, setIsVisible] = useState(true);
  const divRef = useRef(null);

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['All Playlist Data'],
    queryFn: ({ pageParam }) => fetchAllPlaylist(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageable.page_size - 1 > pageIndex) {
        return pageIndex + 1;
      }
    },
  });

  useEffect(() => {
    fetchNextPage();
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
  }, [divRef.current]);

  const handleForwardClick = () => {
    if (isVisible) {
      setPageIndex(pageIndex + 1);
      fetchNextPage();
    }
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-zinc-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div
        className="flex h-full w-11/12 flex-row items-center justify-start"
        style={getSlideContentStyle(pageIndex, 3)}
      >
        {data?.pages.map((page: any) =>
          page?.content.map((content: any, index: any) => (
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
              id={content.playlist_id}
            />
          )),
        )}
        <div ref={divRef} />
      </div>
      <div className="bg-zinc-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default AllPlayListComponent;
