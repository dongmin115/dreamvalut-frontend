/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import { ThemeProvider } from '@emotion/react';
import { IconButton, createTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Divider from '@mui/material/Divider';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Tag, TrackInfo, searchResult } from '@/types/search';
import FavoriteButton from '@/app/components/FavoriteButton';
import InfiniteScroll from '@/app/components/InfiniteScroll';
import { fetchSearch } from '@/api/music';

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

const SearchResult = ({ item }: { item: TrackInfo }) => {
  // 로딩중일 경우
  // if (isLoading) {
  //   return (
  //     <div className="my-auto h-full w-full items-center text-center text-2xl">
  //       {decodeURIComponent(keyward)}에 대한 검색 결과 가져오는중...
  //     </div>
  //   );
  // }
  // // 검색 결과가 없을 경우
  // if (data && data.total_elements === 0) {
  //   return (
  //     <div className="my-auto h-fit w-full items-center text-center text-2xl">
  //       {decodeURIComponent(keyward)}에 대한 검색 결과가 없습니다.
  //     </div>
  //   );
  // }

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  // 검색 결과가 있을 경우
  return (
    <Link href={`/track/${item.id}`}>
      <li className="hover-bg-opacity flex h-fit flex-row items-center justify-around rounded-xl p-[1%]">
        <div className="flex w-[60%] flex-row items-center justify-between  gap-4 lg:gap-4 xl:gap-6 2xl:gap-8">
          <div className="flex w-fit flex-col items-center justify-center gap-1 lg:gap-2 xl:gap-3 2xl:gap-4">
            <img
              src={item.thumbnail_image}
              alt="cover"
              className="size-20 rounded-sm lg:size-20 xl:size-24 2xl:size-28"
            />
            <p
              className="w-fit items-center text-xs lg:text-xs xl:text-xs 2xl:text-sm"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
          </div>
          <div className="flex w-[80%] flex-col items-center justify-center gap-2">
            <div className="flex flex-row gap-2 self-start">
              <div
                key={item.track_genre.genre_id}
                className="w-fit rounded-full bg-[#5419d4]  p-2 text-xs"
              >
                {stripHtmlTags(item.track_genre.genre_name)}
              </div>
              {item.track_tags.map((tags: Tag) => (
                <div
                  key={tags.tag_id}
                  className="w-fit rounded-full bg-[#5419d4] bg-opacity-75 p-2 text-xs"
                >
                  {stripHtmlTags(tags.tag_name)}
                </div>
              ))}
            </div>
            <p
              className="w-full items-center text-xs  lg:text-xs xl:text-sm 2xl:text-base"
              dangerouslySetInnerHTML={{ __html: item.prompt }}
            />
          </div>
        </div>
        <p
          className="w-[10%] text-center text-sm lg:text-sm xl:text-base 2xl:text-lg"
          dangerouslySetInnerHTML={{ __html: item.uploader_name }}
        />
        <div className="flex w-[10%] flex-row items-center justify-center gap-2">
          <FavoriteButton
            color="primary"
            fontSize="medium"
            likes_flag={item.likes_flag}
            track_id={item.id}
            likes_count={item.likes}
            count_visible={true}
          />
        </div>
        <div className="w-[10%] text-center">
          <IconButton>
            <PlayArrowIcon color="primary" fontSize="large" />
          </IconButton>
        </div>
      </li>
    </Link>
  );
};

export default function SearchPage(props: any) {
  const fetchMoreSearch = async ({ pageParam = 0 }) => {
    const response = await fetchSearch(props.params.keyward, pageParam, 8);
    return response;
  };

  const getNextPageParam = (
    lastPage: searchResult,
    allPages: searchResult[],
  ) => {
    if (lastPage.last) {
      return undefined;
    }
    return allPages.length;
  };

  const { data, isLoading } = useInfiniteQuery({
    queryKey: ['search', props.params.keyward],
    queryFn: fetchMoreSearch,
    getNextPageParam,
    initialPageParam: 0,
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="h-fit min-h-screen">
        {/* NavBar 제외영역 */}
        <div className="h-fit w-full">
          <div className="flex w-full flex-col gap-8 p-[3%]">
            {isLoading ? (
              <p className="w-fit text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                검색결과 가져오는 중 ...
              </p>
            ) : (
              <p className="w-fit text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                <em>{decodeURIComponent(props.params.keyward)}</em> 에 대한 검색
                결과 {data?.pages[0].total_elements}건 입니다.
              </p>
            )}
            <div className="flex h-fit w-full flex-col gap-4 rounded-xl bg-[#353535] p-[2%]">
              <div className="flex h-fit flex-row items-center justify-around">
                <p className="w-[60%] text-center text-base lg:text-base xl:text-lg 2xl:text-xl">
                  곡정보
                </p>
                <p className="w-[10%] text-center text-base lg:text-base xl:text-lg 2xl:text-xl">
                  제작자
                </p>
                <p className="w-[10%] text-center text-base lg:text-base xl:text-lg 2xl:text-xl">
                  좋아요
                </p>
                <p className="w-[10%] text-center text-base lg:text-base xl:text-lg 2xl:text-xl">
                  재생
                </p>
              </div>
              <Divider />
              {/* 검색 결과 리스트 */}
              <ul className="flex h-fit min-h-[70vh] flex-col gap-8">
                <InfiniteScroll
                  queryKey={['search']}
                  queryFn={fetchMoreSearch}
                  renderItem={(item: TrackInfo) => <SearchResult item={item} />}
                  getNextPageParam={getNextPageParam}
                  dataPath={(page: searchResult) => page.content}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
