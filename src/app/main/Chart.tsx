/* eslint-disable object-curly-newline */

'use client';

import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ThemeProvider } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { getSlideContentStyle } from '@/app/styles/slide.ts';
import Link from 'next/link';
import { matchMedia } from '@/util/matchMedia.ts';
import { chartProps } from '../../types/chart.ts';
import { fetchChartData } from '../../api/chart.ts';
import theme from '../styles/theme.ts';

function MusicElement({ ranking, thumnailImage, title, trackId }: chartProps) {
  return (
    <Link
      href={`/track/${trackId}`}
      className="hover-bg-opacity my-1 flex h-1/4 w-1/2 cursor-pointer flex-row items-center justify-start lg:w-1/2 xl:w-1/3 2xl:w-1/4"
    >
      {/* 순위 */}
      <p className="drop-shadow-text z-10 -ml-3 -mr-3 mt-6 w-16 text-right text-3xl xl:-ml-4 xl:-mr-4 xl:text-4xl ">
        {ranking}
      </p>
      {/* 앨범 커버 */}
      <figure className="relative flex h-12 w-12 xl:h-14 xl:w-14 2xl:h-16 2xl:w-16">
        <Image
          alt="Album Cover"
          src={thumnailImage}
          layout="fill"
          objectFit="cover"
        />
      </figure>

      {/* 음악 정보 */}
      <div className="ml-2 flex flex-col justify-center">
        <p className="text-md z-10 flex w-full flex-wrap p-2">{title}</p>
      </div>
    </Link>
  );
}

function Chart() {
  const [pageIndex, setPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const renderSize = 60;
  const musicList = [];

  matchMedia();
  const [chartSize, setChartSize] = useState<number>(2); // 차트에 표시할 음악 개수

  useEffect(() => {
    if (matchMedia() === '2xl') {
      setChartSize(4);
    } else if (matchMedia() === 'xl') {
      setChartSize(3);
    } else {
      setChartSize(2);
    }
  }, []);

  window.addEventListener('resize', () => {
    if (matchMedia() === '2xl') {
      setChartSize(4);
    } else if (matchMedia() === 'xl') {
      setChartSize(3);
    } else {
      setChartSize(2);
    }
  });

  const { isLoading, data } = useQuery({
    queryKey: ['Chart Music Data'],
    queryFn: () => fetchChartData(0, renderSize), // 하드코딩, 추후 수정 필요
  });
  if (data) {
    // 데이터가 존재할 때만 PopularMusic 컴포넌트 생성
    for (let i = 0; i < renderSize; i += 1) {
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
    if (Math.ceil(data.content.length / 3) - chartSize > pageIndex) {
      setPageIndex(pageIndex + 1);
    } // 이때 chartSize는 한번에 보여지는 인기음악의 개수
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
        style={getSlideContentStyle(pageIndex, chartSize)}
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
