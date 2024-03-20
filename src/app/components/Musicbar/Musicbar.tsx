// 'use client';

// import { useEffect, useState } from 'react';

/* eslint-disable @next/next/no-img-element */
export default function MusicBar() {
  // const [albumColor, setAlbumColor] = useState<string>('#000000');
  // useEffect(() => {
  //   setAlbumColor('#FE4500');
  // }, []);

  return (
    <div className="fixed bottom-[2%] left-[15%] w-[80%] h-[7%] rounded-md px-[2%] py-[0.5%] flex justify-between bg-gradient-to-r from-[#333333] from-20% via-[#7c7a47] via-50%  to-[#333333] to-90% shadow-lg">
      {/* 재생 컨트롤 버튼 */}
      <div className="flex flex-row py-[0.5%] space-x-3">
        <img src="./pre-skip-btn/pre-skip-btn90.png" alt="previous music btn" />
        <img src="./play-btn/play90.png" alt="play or stop btn" />
        <img src="./skip-btn/skip-btn90.png" alt="next music btn" />
        <img src="./replay-btn/replay-btn90.png" alt="replay btn" />
      </div>
      {/* 음악 정보 */}
      <div className="flex flex-row space-x-4">
        <img
          src="https://via.placeholder.com/50"
          alt="album cover"
          width={50}
          height={50}
        />
        <div className="flex flex-col justify-center items-center">
          <p className="">music title</p>
          <p className="text-gray-400">artist name</p>
        </div>
      </div>
      {/* 볼륨 조절 */}
      <div className="flex flex-row">
        <img
          src="https://via.placeholder.com/50"
          alt="volume down btn"
          width={50}
          height={50}
        />
        <img
          src="https://via.placeholder.com/50"
          alt="volume bar"
          width={50}
          height={50}
        />
        <img
          src="https://via.placeholder.com/50"
          alt="volume up btn"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
