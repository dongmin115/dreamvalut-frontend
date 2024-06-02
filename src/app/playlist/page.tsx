'use server';

import MyPlaylistComponent from './MyPlaylist.tsx';
import FollowPlaylistComponent from './FollowPlaylist.tsx';
import FollowSystemPlaylist from './FollowSystemPlaylist.tsx';

async function page() {
  return (
    <>
      <div className="flex h-full w-full flex-col items-start justify-start overflow-hidden px-6">
        {/* 내가 생성한 플레이리스트 */}
        <h1 className="mb-4 mt-14 text-xl font-bold xl:text-2xl 2xl:text-3xl">
          내가 생성한 플레이리스트
        </h1>
        <div className="flex h-64 w-full flex-row items-center justify-center overflow-hidden xl:h-72 2xl:h-80">
          <MyPlaylistComponent />
        </div>

        {/* 팔로우한 플레이리스트 */}
        <h1 className="mb-4 mt-14 text-xl font-bold xl:text-2xl 2xl:text-3xl">
          팔로우한 플레이리스트
        </h1>
        <div className="flex h-64 w-full flex-row items-center justify-center overflow-hidden xl:h-72 2xl:h-80">
          <FollowPlaylistComponent />
        </div>

        {/* 시스템 플레이리스트 */}
        <h1 className="mb-4 mt-14 text-xl font-bold xl:text-2xl 2xl:text-3xl">
          구독한 플레이리스트
        </h1>
        <div className="flex h-64 w-full flex-row items-center justify-center overflow-hidden xl:h-72 2xl:h-80">
          <FollowSystemPlaylist />
        </div>
      </div>

      {/* 아래 여백 */}
      <div className="h-40 w-full" />
    </>
  );
}

export default page;
