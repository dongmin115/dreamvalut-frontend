'use server';

import MyPlaylistComponent from './myPlaylistComponent.tsx';
import FollowPlaylistComponent from './followPlaylistComponent.tsx';
import SystemPlaylistComponent from '../main/systemPlaylistComponent.tsx';

async function page() {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-end items-end overflow-hidden">
        <div className="w-10/12 h-full pr-8">
          {/* 내가 생성한 플레이리스트 */}
          <h1 className="">내가 생성한 플레이리스트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl overflow-hidden">
            <MyPlaylistComponent />
          </div>

          {/* 팔로우한 플레이리스트 */}
          <h1 className="">팔로우한 플레이리스트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl">
            <FollowPlaylistComponent />
          </div>

          {/* 시스템 플레이리스트 */}
          <h1 className="">구독한 플레이리스트</h1>
          <div className="flex flex-row justify-center items-center w-full h-80 bg-gray-650 rounded-2xl">
            <SystemPlaylistComponent />
          </div>
        </div>

        {/* 아래 여백 */}
        <div className="w-full h-40" />
      </div>
    </>
  );
}

export default page;
