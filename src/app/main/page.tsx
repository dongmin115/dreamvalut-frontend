/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */

'use server';

import Chart from './Chart.tsx';
import Tag from './Tag.tsx';
import Genre from './Genre.tsx';
import AllPlaylistComponent from './AllPlayList.tsx';
import SystemPlaylistComponent from './SystemPlaylist.tsx';

// 메인 페이지 컴포넌트
async function Page() {
  return (
    <div className="flex h-full w-full flex-col items-end justify-end">
      {/* NavigationBar 제외 영역 */}
      <div className="h-full w-10/12 pr-8">
        {/* 인기 차트 */}
        <h1 className="">인기 차트</h1>
        <div className="bg-gray-650 flex h-80 w-full flex-row items-center justify-center overflow-hidden rounded-2xl">
          <Chart />
        </div>

        {/* 인기 태그 */}
        <h1 className="">태그별 음악</h1>
        <div className="bg-gray-650 flex h-80 w-full flex-row items-center justify-center overflow-hidden rounded-2xl">
          <Tag />
        </div>

        {/* 장르별 음악 */}
        <h1 className="">장르별 음악</h1>
        <div className="bg-gray-650 flex h-[30rem] w-full flex-row items-center justify-center overflow-hidden rounded-2xl">
          <Genre />
        </div>

        {/* 다른 유저가 선택한 플레이리스트 */}
        <h1 className="">다른 유저가 선택한 플레이리스트</h1>
        <div className="bg-gray-650 flex h-96 w-full flex-row items-center justify-center overflow-hidden rounded-2xl">
          <AllPlaylistComponent />
        </div>

        {/* 구독한 플레이리스트 */}
        <h1 className="">DreamVault가 제공하는 플레이리스트</h1>
        <div className="bg-gray-650 flex h-80 w-full flex-row items-center justify-center overflow-hidden rounded-2xl">
          <SystemPlaylistComponent />
        </div>
      </div>
      {/* 아래 여백, footer 넣을 예정 */}
      <div className="h-40 w-full" />
    </div>
  );
}

export default Page;
