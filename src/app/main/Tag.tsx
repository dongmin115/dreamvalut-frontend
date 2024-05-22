'use client';

import { useState } from 'react';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { ThemeProvider } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import AlbumCoverSystem from '../components/AlbumCover/AlbumCoverSystem.tsx';
import theme from '../styles/theme.ts';
import { fetchTags } from '../../api/playlist.ts';

function Tag() {
  const [pageIndex, setPageIndex] = useState(0); // 인기 음악 페이지 인덱스
  const musicList = [];

  const { isLoading, data } = useQuery({
    queryKey: ['TagsData', pageIndex], // pageIndex를 queryKey에 추가
    queryFn: () => fetchTags(pageIndex),
  });

  const handleForwardClick = () => {
    if (data.total_pages - 1 > pageIndex) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleBackwardClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  if (data) {
    // 데이터가 존재할 때만 PopularMusic 컴포넌트 생성
    for (let i = 0; i < 6; i += 1) {
      if (data.content[i]) {
        // 데이터가 존재하는 경우에만 생성
        musicList.push(
          <div key={i}>
            <AlbumCoverSystem
              key={i}
              image={data.content[i].tag_image}
              title={data.content[i].tag_name}
              Id={data.content[i].tag_id}
              curation="tag"
            />
          </div>,
        );
      }
    }
  } else {
    return <div>불러오기 실패</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleBackwardClick}>
          {pageIndex !== 0 && <BackIcon color="primary" fontSize="large" />}
        </IconButton>
      </div>
      <div className="flex h-full w-11/12 flex-row items-center justify-start">
        {musicList}
      </div>
      <div className="bg-gray-650 z-30 flex h-full w-1/12 flex-row items-center justify-center">
        <IconButton onClick={handleForwardClick}>
          <ForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}

export default Tag;
