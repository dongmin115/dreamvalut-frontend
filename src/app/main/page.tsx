/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */

'use server';

import ChartMusicComponent from './ChartMusic.tsx';
import Tag from './Tag.tsx';
import GenreMusicComponent from './GenreMusic.tsx';
import AllPlaylistComponent from './AllPlayList.tsx';
import SystemPlaylistComponent from './SystemPlaylist.tsx';

// 메인 페이지 컴포넌트
async function Page() {
  return (
    <div className="w-full h-full flex flex-col justify-end items-end">
      {/* NavigationBar 제외 영역 */}
      <div className="w-10/12 h-full pr-8">
        {/* 인기 차트 */}
        <h1 className="">인기 차트</h1>
        <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl overflow-hidden">
          <ChartMusicComponent />
        </div>

        {/* 인기 태그 */}
        <h1 className="">태그별 음악</h1>
        <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl overflow-hidden">
          <Tag />
        </div>

        {/* 장르별 음악 */}
        <h1 className="">장르별 음악</h1>
        <div className="flex flex-row justify-center items-center w-full h-[30rem] bg-gray-650 rounded-2xl overflow-hidden">
          <GenreMusicComponent />
        </div>

        {/* 다른 유저가 선택한 플레이리스트 */}
        <h1 className="">다른 유저가 선택한 플레이리스트</h1>
        <div className="flex flex-row justify-center items-center w-full h-96 bg-gray-650 rounded-2xl overflow-hidden">
          <AllPlaylistComponent />
        </div>

        {/* 구독한 플레이리스트 */}
        <h1 className="">DreamVault가 제공하는 플레이리스트</h1>
        <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl overflow-hidden">
          <SystemPlaylistComponent />
        </div>
      </div>
      {/* 아래 여백, footer 넣을 예정 */}
      <div className="w-full h-40" />
    </div>
  );
}

export default Page;
