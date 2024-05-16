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

import { fetchTagDetail } from '@/api/playlist.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import PlayButton from './PlayButton.tsx';
import MusicElement from './MusicElement.tsx';

function page(props: { params: { tagId: string } }) {
  const tagId = decodeURIComponent(props.params.tagId);
  const renderSize = 12;
  const [playlistName, setPlaylistName] = useState('');
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['Tag Details', tagId],
    queryFn: ({ pageParam }) => fetchTagDetail(tagId, pageParam, renderSize),
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.tracks.next === null) {
        return undefined;
      }
      return allPages.length;
    },
  });
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null, // 기본적으로 브라우저 뷰포트를 root로 사용
        rootMargin: '0px',
        threshold: 0.1, // 타겟 요소가 10% 보이면 콜백 실행
      },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data === undefined) return;
    setPlaylistName(data.pages['0'].tag_name);
  }, [data]);

  if (isLoading || data === undefined) return <div>Loading...</div>;
  return (
    <div className="flex h-full w-full flex-col items-end justify-end overflow-hidden">
      <div className="h-full w-10/12 pr-8">
        {/* 플리 제목 및 플레이 아이콘 */}
        <div className="flex w-full flex-row items-center justify-center ">
          <h1 className="w-full text-start">
            <p className="flex h-16 items-center justify-start p-4">
              #{playlistName}
            </p>
          </h1>

          <PlayButton tagId={tagId} />
        </div>
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
          {data.pages.map((page: any) =>
            page.tracks.content.map((track: any) => (
              <MusicElement
                key={track.track_id}
                image={track.thumbnail_image}
                title={track.title}
                like={track.likes}
                isLiked={track.likes_flag}
                trackId={track.track_id}
                playlistId={tagId}
                isEdit={false}
              />
            )),
          )}
          <div ref={loadMoreRef} />
        </div>
      </div>
    </div>
  );
}

export default page;
