/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import { ThemeProvider } from '@emotion/react';
import { IconButton, createTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Divider from '@mui/material/Divider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from '@/app/Cookies';
import { Tag, TrackInfo, searchResult } from '@/types/search';
import FavoriteButton from '@/app/components/FavoriteButton';

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

const SearchResult = ({
  data,
  isLoading,
  keyward,
}: {
  data: searchResult;
  isLoading: boolean;
  keyward: string;
}) => {
  // 로딩중일 경우
  if (isLoading) {
    return (
      <div className="my-auto h-full w-full items-center text-center text-2xl">
        {decodeURIComponent(keyward)}에 대한 검색 결과 가져오는중...
      </div>
    );
  }
  // 검색 결과가 없을 경우
  if (data && data.total_elements === 0) {
    return (
      <div className="my-auto h-fit w-full items-center text-center text-2xl">
        {decodeURIComponent(keyward)}에 대한 검색 결과가 없습니다.
      </div>
    );
  }

  // 검색 결과가 있을 경우
  return (
    <>
      {data.content.map((e: TrackInfo, i: number) => (
        <li key={i} className="flex h-fit flex-row items-center justify-around">
          {/* 검색 결과 내용 */}
          <div className="flex w-[60%] flex-row items-center justify-between gap-8">
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
            <div className="flex w-[80%] flex-col items-center justify-center gap-2">
              <div className="flex flex-row gap-2 self-start">
                {e.track_tags.map((tags: Tag) => (
                  <div
                    key={tags.tag_id}
                    className="w-fit rounded-full bg-[#5419d4] p-2 text-xs"
                  >
                    {tags.tag_name}
                  </div>
                ))}
              </div>
              <p
                className="text-md w-full items-center"
                dangerouslySetInnerHTML={{ __html: e.prompt }}
              />
            </div>
          </div>
          <p
            className="w-[10%] text-center text-lg text-[#777777]"
            dangerouslySetInnerHTML={{ __html: e.uploader_name }}
          />
          <div className="flex w-[10%] flex-row items-center justify-center gap-2">
            <FavoriteButton
              color="primary"
              fontSize="medium"
              likes_flag={e.likes_flag}
              track_id={e.id}
              likes_count={e.likes}
            />
          </div>
          <div className="w-[10%] text-center">
            <IconButton>
              <PlayArrowIcon color="primary" fontSize="large" />
            </IconButton>
          </div>
        </li>
      ))}
    </>
  );
};

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
            {isLoading ? (
              <p className="w-fit text-xl">검색결과 가져오는 중 ...</p>
            ) : (
              <p className="w-fit text-xl">
                <em>{decodeURIComponent(props.params.keyward)}</em> 에 대한 검색
                결과 {data.total_elements}건 입니다.
              </p>
            )}
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
                <SearchResult
                  data={data}
                  isLoading={isLoading}
                  keyward={props.params.keyward}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
