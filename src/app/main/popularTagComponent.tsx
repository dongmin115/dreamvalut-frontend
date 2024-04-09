/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import AlbumCoverSystem from '../components/AlbumCover/AlbumCoverSystem.tsx';

function popularTagComponent() {
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
  return (
    <>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div className="w-11/12 h-full flex flex-row items-center justify-start">
        <AlbumCoverSystem
          image="https://i.ibb.co/k55YHSL/Perfect-Night.jpg"
          title="신나는"
        />
      </div>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </>
  );
}

export default popularTagComponent;
