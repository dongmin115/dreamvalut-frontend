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
import { getCookie } from '@/app/Cookies';

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
      const accessToken = await getCookie('accessToken');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/search`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            query: props.params.keyward,
            page: 0,
          },
        },
      );
      console.log(response.data);
      return response.data;
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="h-fit min-h-screen">
        {/* NavBar 제외영역 */}
        <div className="h-fit w-full pl-[15%]">
          <div className="flex w-full flex-col gap-8 p-[3%]">
            <p className="w-fit text-xl">
              <em>{decodeURIComponent(props.params.keyward)}</em> 에 대한 검색
              결과 {data.total_elements}건 입니다.
            </p>
            <div className="flex h-fit w-full flex-col gap-4 rounded-xl bg-[#353535] p-[2%]">
              <div className="flex h-fit flex-row items-center justify-around">
                <p className="w-[60%] text-center text-xl">곡정보</p>
                <p className="w-[10%] text-center text-lg">제작자</p>
                <p className="w-[10%] text-center text-lg">좋아요</p>
                <p className="w-[10%] text-center text-lg">재생</p>
              </div>
              <Divider />
              {/* 검색 결과 리스트 */}
              <ul className="flex h-fit min-h-[70vh] flex-col gap-8">
                {isLoading ? (
                  <div className="my-auto h-full w-full text-center text-2xl">
                    {decodeURIComponent(props.params.keyward)}에 대한 검색 결과
                    가져오는중...
                  </div>
                ) : (
                  data.content.map((e: searchResult, i: number) => (
                    <li
                      key={i}
                      className="flex h-fit flex-row items-center justify-around"
                    >
                      {/* 앨범 커버, 곡 이름 + 태그, 프롬프트 내용 flexbox */}
                      <div className="flex w-[60%] flex-row items-center justify-between gap-8">
                        {/* 앨범 커버, 곡 이름 flexbox */}
                        <div className="flex w-fit flex-col items-center justify-center gap-4">
                          <img
                            src={e.thumbnail_image}
                            alt="cover"
                            className="size-28 rounded-sm"
                          />
                          <p
                            className="xs:text-xs w-fit text-center md:text-xs lg:text-xs xl:text-sm"
                            dangerouslySetInnerHTML={{ __html: e.title }}
                          />
                        </div>
                        {/* 태그, 프롬프트 내용 flexbox */}
                        <div className="flex w-[80%] flex-col items-center justify-center gap-2">
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
                            className="text-md w-full items-center"
                            dangerouslySetInnerHTML={{ __html: e.prompt }}
                          />
                        </div>
                      </div>
                      {/* 제작자 */}
                      <p
                        className="w-[10%] text-center text-lg text-[#777777]"
                        dangerouslySetInnerHTML={{ __html: e.uploader_name }}
                      />
                      {/* 좋아요 */}
                      <div className="flex w-[10%] flex-row items-center justify-center gap-2">
                        <IconButton>
                          <FavoriteIcon color="primary" fontSize="medium" />
                        </IconButton>
                        <p className="w-fit text-center text-lg">{e.likes}</p>
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
