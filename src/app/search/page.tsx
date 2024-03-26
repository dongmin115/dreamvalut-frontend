/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */
import Divider from '@mui/material/Divider';
import NavBar from '../components/NavBar/NavigationBar';

export default function SearchPage() {
  return (
    <div className="h-fit min-h-screen bg-[#1a1a1a]">
      <NavBar />
      {/* NavBar 제외영역 */}
      <div className="pl-[15%] h-fit w-full">
        <div className="flex p-[3%] flex-col gap-8 w-full">
          <p className="text-xl w-fit">에스파에 대한 검색 결과입니다.</p>
          <div className="flex flex-col bg-[#353535] h-fit rounded-xl w-full p-[2%] gap-4">
            <div className="flex flex-row justify-around items-center h-fit">
              <p className="text-xl w-[60%] text-center">곡정보</p>
              <p className="text-lg">제작자</p>
              <p className="text-lg">좋아요</p>
              <p className="text-lg">재생</p>
            </div>
            <Divider />
            <ul className="flex flex-col gap-4 h-fit">
              <li className="flex flex-row justify-around items-center h-fit p-[1%]">
                <div className="flex flex-row justify-between items-center w-[60%] gap-8">
                  <div className="flex flex-col justify-center items-center w-fit gap-4">
                    <img
                      src="https://i.ibb.co/hLxvjJG/1.jpg"
                      alt="cover"
                      className="size-24 rounded-sm"
                    />
                    <p className="text-lg">title</p>
                  </div>
                  <p className="text-md items-center w-[80%]">
                    "Cyclone Silence" merges the ethereal qualities of Ambient
                    music with a more intense and forceful atmosphere. This
                    track weaves together swirling synths and deep, pulsating
                    beats, creating a soundscape that's both aggressive and
                    enveloping. It's a journey through a storm of emotions,
                    where the power of nature meets the tranquility of ambient
                    soundscapes
                  </p>
                </div>
                <p className="text-lg">aespa</p>
                <p className="text-lg">1</p>
                <p className="text-lg">1</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
