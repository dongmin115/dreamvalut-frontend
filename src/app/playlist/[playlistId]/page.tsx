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
    <div className="w-full h-full flex flex-col justify-end items-end overflow-hidden">
      <div className="w-10/12 h-full pr-8">
        {/* 플리 제목 및 플레이 아이콘 */}
        <div className="flex flex-row w-full justify-center items-center ">
          <h1 className="w-full text-start">{data.playlist_name}</h1>
          <PlayButton playlistId={playlistId} />
        </div>
        {/* 플리 박스 */}
        <div className="flex flex-col items-center w-full h-auto p-8 bg-gray-650 rounded-2xl">
          <div className="flex flex-row w-full">
            <p className="flex w-full text-2xl px-20"> 곡 정보</p>
            <p className="flex w-2/12 text-2xl justify-center items-center">
              좋아요
            </p>
            <p className="flex w-24 text-2xl justify-center ">재생</p>
          </div>
          <hr className="w-full my-6 border-zinc-600" />
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
