/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

'use client';

import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import { chartProps } from '../../types/chart';
import { fetchChartData } from '../../api/chart';
import { getSlideContentStyle } from '../styles/SlideStyles';

function MusicElement({ ranking, thumnailImage, title }: chartProps) {
  return (
    <div className="w-[24%] h-1/4 flex flex-row justify-start items-center m-2 cursor-pointer hover-bg-opacity">
      {/* 순위 */}
      <p className="w-16 text-right text-4xl mt-6 drop-shadow-text z-10 -mr-4">
        {ranking}
      </p>
      {/* 앨범 커버 */}
      <img className="w-16" src={thumnailImage} />

      {/* 음악 정보 */}
      <div className="flex flex-col justify-center ml-4">
        <p className="text-xl w-full z-10">{title}</p>
      </div>
    </div>
  );
}

function PopularMusicComponent() {
  const [pageIndex, setPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const musicList = [];
  const [data, setData] = useState<any>([]);
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

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        try {
          const res = await fetchChartData();
          setData(res); // 가져온 데이터를 상태 변수에 저장
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      };

      fetchData(); // fetchData 함수 호출
    }, 500);
  }, []);

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
  return (
    <>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div
        className={
          'w-5/6 h-full flex flex-col flex-wrap justify-center items-start slide-content'
        }
        style={getSlideContentStyle(pageIndex)}
      >
        {musicList}
      </div>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </>
  );
}

export default PopularMusicComponent;
