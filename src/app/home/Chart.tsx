/* eslint-disable object-curly-newline */

'use client';

import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import Image from 'next/image';
import { ThemeProvider } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { getSlideContentStyle } from '@/app/styles/slide.ts';
import Link from 'next/link';
import { chartProps } from '../../types/chart.ts';
import { fetchChartData } from '../../api/chart.ts';
import theme from '../styles/theme.ts';

function MusicElement({ ranking, thumnailImage, title, trackId }: chartProps) {
  return (
    <Link
      href={`/track/${trackId}`}
      className="hover-bg-opacity m-2 flex h-1/4 w-[24%] cursor-pointer flex-row items-center justify-start"
    >
      {/* 순위 */}
      <p className="drop-shadow-text z-10 -mr-4 mt-6 w-16 text-right text-4xl">
        {ranking}
      </p>
      {/* 앨범 커버 */}
      <Image width={64} height={64} alt="Album Cover" src={thumnailImage} />

      {/* 음악 정보 */}
      <div className="ml-4 flex flex-col justify-center">
        <p className="z-10 w-full text-xl">{title}</p>
      </div>
    </Link>
  );
}

function Chart() {
  const [pageIndex, setPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const renderSize = 60;
  const musicList = [];

  const { isLoading, data } = useQuery({
    queryKey: ['Chart Music Data'],
    queryFn: () => fetchChartData(0, renderSize), // 하드코딩, 추후 수정 필요
  });
  if (data) {
    // 데이터가 존재할 때만 PopularMusic 컴포넌트 생성
    for (let i = 0; i < 60; i += 1) {
      if (data.content[i]) {
        // 데이터가 존재하는 경우에만 생성
        musicList.push(
          <MusicElement
            key={i}
            ranking={i + 1}
            title={data.content[i].title}
            thumnailImage={data.content[i].thumbnail_image}
            trackId={data.content[i].track_id}
          />,
        );
      }
    }
  }

  const handleForwardClick = () => {
    if (Math.ceil(data.content.length / 3) - 4 > pageIndex) {
      setPageIndex(pageIndex + 1);
    } // 이때 4는 한번에 보여지는 인기음악의 개수
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div
        className={
          'slide-content flex h-full w-5/6 flex-col flex-wrap items-start justify-center'
        }
        style={getSlideContentStyle(pageIndex, 4)}
      >
        {isLoading ? <div>Loading...</div> : musicList}
      </div>
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default Chart;
