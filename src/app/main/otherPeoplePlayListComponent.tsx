/* eslint-disable no-unused-vars */

'use client';

import { useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { ThemeProvider } from '@emotion/react';
import AlbumCoverUser from '../components/AlbumCover/AlbumCoverUser.tsx';
import theme from '../styles/theme.ts';

function OtherPeoplePlayListComponent() {
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
    <ThemeProvider theme={theme}>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div className="w-11/12 h-full flex flex-row justify-start items-start">
        <AlbumCoverUser
          image1="https://i.ibb.co/HgFcPLj/getaguitar.webp"
          image2="https://i.ibb.co/TbQL5kz/thatthat.jpg"
          image3="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
          title="텐션 업!"
        />

        <AlbumCoverUser
          image1="https://i.ibb.co/HgFcPLj/getaguitar.webp"
          image2="https://i.ibb.co/TbQL5kz/thatthat.jpg"
          image3="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
          title="낭만 있는 플리"
        />

        <AlbumCoverUser
          image1="https://i.ibb.co/HgFcPLj/getaguitar.webp"
          image2="https://i.ibb.co/TbQL5kz/thatthat.jpg"
          image3="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
          title="올드 팝송"
        />

        <AlbumCoverUser
          image1="https://i.ibb.co/HgFcPLj/getaguitar.webp"
          image2="https://i.ibb.co/TbQL5kz/thatthat.jpg"
          image3="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
          title="나만 들으려고 저장한 노래"
        />
      </div>
      <div className="w-1/12 h-full flex flex-row justify-center items-center z-30 bg-gray-650">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default OtherPeoplePlayListComponent;
