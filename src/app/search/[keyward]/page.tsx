/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import { ThemeProvider } from '@emotion/react';
import { IconButton, createTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { searchResult } from '@/types/search';

const theme = createTheme({
  palette: {
    primary: {
      // 메인 컬러 보라색
      main: '#6C26FF',
    },
    secondary: {
      // 흰색
      main: '#ffffff',
    },
  },
});

export default function SearchPage(props: any) {
  const { data, isLoading } = useQuery({
    queryKey: ['search'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/search');
      return response.data.data.results;
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="h-fit min-h-screen bg-[#1a1a1a]">
        {/* NavBar 제외영역 */}
        <div className="pl-[15%] h-fit w-full">
          <div className="flex p-[3%] flex-col gap-8 w-full">
            <p className="text-xl w-fit">
              <em>{decodeURIComponent(props.params.keyward)}</em>에 대한 검색
              결과입니다.
            </p>
            <div className="flex flex-col bg-[#353535] h-fit rounded-xl w-full p-[2%] gap-4">
              <div className="flex flex-row justify-around items-center h-fit">
                <p className="text-xl w-[60%] text-center">곡정보</p>
                <p className="text-lg w-[10%] text-center">제작자</p>
                <p className="text-lg w-[10%] text-center">좋아요</p>
                <p className="text-lg w-[10%] text-center">재생</p>
              </div>
              <Divider />
              {/* 검색 결과 리스트 */}
              <ul className="flex flex-col gap-8 min-h-[70vh] h-fit">
                {isLoading ? (
                  <div className="h-full w-full text-center my-auto text-2xl">
                    {decodeURIComponent(props.params.keyward)}에 대한 검색 결과
                    가져오는중...
                  </div>
                ) : (
                  data.map((e: searchResult, i: number) => (
                    <li
                      key={i}
                      className="flex flex-row justify-around items-center h-fit"
                    >
                      {/* 앨범 커버, 곡 이름 + 태그, 프롬프트 내용 flexbox */}
                      <div className="flex flex-row justify-between items-center w-[60%] gap-8">
                        {/* 앨범 커버, 곡 이름 flexbox */}
                        <div className="flex flex-col justify-center items-center w-fit gap-4">
                          <img
                            src={e.thumbnail_image}
                            alt="cover"
                            className="size-28 rounded-sm"
                          />
                          <p
                            className="xs:text-xs md:text-xs lg:text-xs xl:text-sm w-fit text-center"
                            dangerouslySetInnerHTML={{ __html: e.title }}
                          />
                        </div>
                        {/* 태그, 프롬프트 내용 flexbox */}
                        <div className="flex flex-col justify-center items-center w-[80%] gap-2">
                          {/* 태그 flexbox */}
                          <div className="flex flex-row gap-2 self-start">
                            {/* 태그 */}
                            {/* {e.tags.map((tags, idx) => (
                              <div
                                key={idx}
                                className="rounded-full bg-[#5419d4] p-2 text-xs w-fit"
                              >
                                {tags}
                              </div>
                            ))} */}
                          </div>
                          {/* 프롬프트 내용 */}
                          <p
                            className="text-md items-center w-full"
                            dangerouslySetInnerHTML={{ __html: e.prompt }}
                          />
                        </div>
                      </div>
                      {/* 제작자 */}
                      <p
                        className="text-lg w-[10%] text-center text-[#777777]"
                        dangerouslySetInnerHTML={{ __html: e.uploader_name }}
                      />
                      {/* 좋아요 */}
                      <div className="flex flex-row justify-center gap-2 items-center w-[10%]">
                        <IconButton>
                          <FavoriteIcon color="primary" fontSize="medium" />
                        </IconButton>
                        <p className="text-lg w-fit text-center">{e.likes}</p>
                      </div>
                      {/* 재생 */}
                      <div className="w-[10%] text-center">
                        <IconButton>
                          <PlayArrowIcon color="primary" fontSize="large" />
                        </IconButton>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
