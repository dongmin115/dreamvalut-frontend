/* eslint-disable @next/next/no-img-element */
/* eslint-disable function-paren-newline */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { fetchGenreDetail } from '@/api/playlist.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import InfiniteScroll from '@/app/components/InfiniteScroll.tsx';
import { Music } from '@/types/music.ts';
import { GenrePlaylist } from '@/types/playlist.ts';
import Image from 'next/image';
import PlayButton from './PlayButton.tsx';
import MusicElement from './MusicElement.tsx';

function page(props: { params: { genreId: string } }) {
  const genreId = decodeURIComponent(props.params.genreId);
  const renderSize = 12;
  const [playlistName, setPlaylistName] = useState('');

  const getNextPageParam = (
    lastPage: GenrePlaylist,
    allPages: GenrePlaylist[],
  ) => {
    if (lastPage.tracks.last) {
      return undefined;
    }
    return allPages.length;
  };

  const fetchMoreGenres = async ({ pageParam = 0 }) => {
    const response = await fetchGenreDetail(genreId, pageParam, renderSize);
    return response;
  };

  const { data, isLoading } = useInfiniteQuery({
    queryKey: ['Genre Details', genreId],
    queryFn: fetchMoreGenres,
    getNextPageParam,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (data === undefined) return;
    setPlaylistName(data.pages['0'].genre_name);
  }, [data]);

  if (isLoading || data === undefined) return <div>Loading...</div>;
  return (
    <div className="flex h-full w-full flex-col items-end justify-end overflow-hidden">
      <div className="h-full w-10/12 pr-8">
        {/* 플리 제목 및 플레이 아이콘 */}

        <div className="relative flex h-80 w-full overflow-hidden">
          <Image
            src={data.pages['0'].genre_image}
            alt="playlist"
            className="absolute left-0 top-0 h-full w-full"
            objectFit="cover"
            layout="fill"
          />
          <div
            className="bg-gray-650  absolute bottom-0 left-0 flex h-full w-full items-end justify-end p-4 text-white"
            style={{
              background:
                'linear-gradient(to top, rgba(26, 26, 26, 1) 10%,rgba(26, 26, 26, 0.95) 30%,  rgba(26, 26, 26, 0.1) 100%)',
            }}
          >
            <h1 className="w-full text-start">
              <p className="flex h-16 items-center justify-start p-4">
                {playlistName}
              </p>
            </h1>

            <PlayButton genreId={genreId} />
          </div>
        </div>

        {/* <div className="flex w-full flex-row items-center justify-center ">
          <h1 className="w-full text-start">
            <p className="flex h-16 items-center justify-start p-4">
              {playlistName}
            </p>
          </h1>

          <PlayButton genreId={genreId} />
        </div> */}
        {/* 플리 박스 */}
        <div className="bg-gray-650 flex h-auto w-full flex-col items-center rounded-2xl p-8">
          <div className="flex w-full flex-row">
            <p className="flex w-full px-20 text-2xl"> 곡 정보</p>
            <p className="flex w-2/12 items-center justify-center text-2xl">
              좋아요
            </p>
            <p className="flex w-24 justify-center text-2xl ">재생</p>
          </div>
          <hr className="my-6 w-full border-zinc-600" />
          {/* 음악 요소들 */}
          <InfiniteScroll
            queryKey={['Genre Details', genreId]}
            queryFn={fetchMoreGenres}
            renderItem={(item: Music) => (
              <MusicElement
                key={item.track_id}
                image={item.thumbnail_image}
                title={item.title}
                like={item.likes}
                isLiked={item.likes_flag}
                trackId={item.track_id}
                playlistId={genreId}
                isEdit={false}
              />
            )}
            getNextPageParam={getNextPageParam}
            dataPath={(page: GenrePlaylist) => page.tracks.content}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
