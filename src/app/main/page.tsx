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
        <h1 className="mb-5 mt-14 text-xl font-bold xl:text-2xl 2xl:text-3xl">
          인기 차트
        </h1>
        <div className="bg-gray-650 flex h-64 w-full flex-row items-center justify-center overflow-hidden rounded-2xl xl:h-72 2xl:h-80 ">
          <Chart />
        </div>

        {/* 인기 태그 */}
        <h1 className="mb-5 mt-14 text-xl font-bold xl:text-2xl 2xl:text-3xl">
          태그 별 음악
        </h1>
        <div className="flex h-36 w-full flex-row items-center justify-center overflow-hidden xl:h-40 2xl:h-44">
          <Tag />
        </div>

        {/* 장르별 음악 */}
        <h1 className="mb-5 mt-14 text-xl font-bold xl:text-2xl 2xl:text-3xl">
          장르별 음악
        </h1>
        <div className="flex h-72 w-full flex-row items-center justify-center overflow-hidden xl:h-96">
          <Genre />
        </div>

        {/* 다른 유저가 선택한 플레이리스트 */}
        <h1 className="mb-5 mt-14 text-xl font-bold xl:text-2xl 2xl:text-3xl">
          다른 유저가 선택한 플레이리스트
        </h1>
        <div className="flex h-60 w-full flex-row items-center justify-center overflow-hidden xl:h-64 2xl:h-80">
          <AllPlaylistComponent />
        </div>

        {/* 구독한 플레이리스트 */}
        <h1 className="mb-5 mt-14 text-xl font-bold xl:text-2xl 2xl:text-3xl">
          DreamVault 가 제공하는 플레이리스트
        </h1>
        <div className="flex h-36 w-full flex-row items-center justify-center overflow-hidden xl:h-40 2xl:h-44">
          <SystemPlaylistComponent />
        </div>
      </div>
      {/* 아래 여백, footer 넣을 예정 */}
      <div className="h-40 w-full" />
    </div>
  );
}

export default Page;
