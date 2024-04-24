/* eslint-disable @next/next/no-img-element */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */

'use server';

import MusicElement from './MusicElement.tsx';
import PlayButton from './PlayButton.tsx';

async function page(props: any) {
  const playlistId = decodeURIComponent(props.params.playlistId);

  return (
    <div className="w-full h-full flex flex-col justify-end items-end overflow-hidden">
      <div className="w-10/12 h-full pr-8">
        {/* 플리 제목 및 플레이 아이콘 */}
        <div className="flex flex-row w-full justify-center items-center ">
          <h1 className="w-full text-start">{playlistId}</h1>
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
            image="https://i.ibb.co/L0GHzbR/202402211005009.jpg"
            title="Shopper"
            like={1234123}
            isLiked={true}
          />
          <MusicElement
            image="https://i.ibb.co/HV9HB6G/bigbangM.jpg"
            title="삐딱하게"
            like={511234}
            isLiked={true}
          />
          <MusicElement
            image="https://i.ibb.co/DGWrD6M/image.jpg"
            title="불꽃놀이"
            like={1534}
            isLiked={false}
          />
          <MusicElement
            image="https://i.ibb.co/4d0pj5j/dynamite.webp"
            title="Dynamite"
            like={34}
            isLiked={false}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
