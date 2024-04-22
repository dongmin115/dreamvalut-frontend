/* eslint-disable no-console */

'use client';

import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import Image from 'next/image';
import { ThemeProvider } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { getSlideContentStyle } from '@/app/styles/slide.ts';
import { chartProps } from '../../types/chart.ts';
import { fetchChartData } from '../../api/chart.ts';
import theme from '../styles/theme.ts';

function MusicElement({ ranking, thumnailImage, title }: chartProps) {
  return (
    <div className="w-[24%] h-1/4 flex flex-row justify-start items-center m-2 cursor-pointer hover-bg-opacity">
      {/* 순위 */}
      <p className="w-16 text-right text-4xl mt-6 drop-shadow-text z-10 -mr-4">
        {ranking}
      </p>
      {/* 앨범 커버 */}
      <Image width={64} height={64} alt="Album Cover" src={thumnailImage} />

      {/* 음악 정보 */}
      <div className="flex flex-col justify-center ml-4">
        <p className="text-xl w-full z-10">{title}</p>
      </div>
    </div>
  );
}

function ChartMusicComponent() {
  const [pageIndex, setPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const musicList = [];

  const { isLoading, data } = useQuery({
    queryKey: ['chartData'],
    queryFn: fetchChartData,
  });
  if (data) {
    // 데이터가 존재할 때만 PopularMusic 컴포넌트 생성
    for (let i = 0; i < 30; i += 1) {
      if (data[i]) {
        // 데이터가 존재하는 경우에만 생성
        musicList.push(
          <MusicElement
            key={i}
            ranking={i + 1}
            title={data[i].title}
            thumnailImage={data[i].thumbnail_image}
          />,
        );
      }
    }
  }

  const handleForwardClick = () => {
    if (Math.ceil(data.length / 3) - 4 > pageIndex) {
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
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div
        className={
          'w-5/6 h-full flex flex-col flex-wrap justify-center items-start slide-content'
        }
        style={getSlideContentStyle(pageIndex, 4)}
      >
        {isLoading ? <div>Loading...</div> : musicList}
      </div>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default ChartMusicComponent;
