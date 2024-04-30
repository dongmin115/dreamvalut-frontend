/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */

'use client';

import { fetchPlaylistDetail } from '@/api/playlist.ts';
import { useQuery } from '@tanstack/react-query';
import PlayButton from './PlayButton.tsx';
import MusicElement from './MusicElement.tsx';

function page(props: any) {
  const playlistId = decodeURIComponent(props.params.playlistId);
  const { isLoading, data } = useQuery({
    queryKey: ['Playlist Details', playlistId],
    queryFn: () => fetchPlaylistDetail(playlistId),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex h-full w-full flex-col items-end justify-end overflow-hidden">
      <div className="h-full w-10/12 pr-8">
        {/* 플리 제목 및 플레이 아이콘 */}
        <div className="flex w-full flex-row items-center justify-center ">
          <h1 className="w-full text-start">{data.playlist_name}</h1>
          <PlayButton playlistId={playlistId} />
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
          <MusicElement
            image={data.tracks.content[0].thumbnail_image}
            title={data.tracks.content[0].title}
            // like={data.tracks.content[0]like} // 테스트 서버에 해당 값이 없음
            // isLiked={data.tracks.content[0].is_liked} // 테스트 서버에 해당 값이 없음
            like={data.tracks.content[0].duration} // 임시로 값 부여
            isLiked={data.tracks.content[0].has_lyrics} // 임시 값 부여
            trackId={data.tracks.content[0].track_id}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
