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
              <p className="text-xl">곡정보</p>
              <p className="text-lg">제작자</p>
              <p className="text-lg">좋아요</p>
              <p className="text-lg">재생</p>
            </div>
            <Divider />
            <ul className="flex flex-col gap-4 h-fit">
              <li>1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
