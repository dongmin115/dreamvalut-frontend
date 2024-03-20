export default function MusicBar() {
  return (
    <div className="fixed bottom-[2%] left-[15%] w-[80%] h-[7%] bg-gray-600 rounded-md px-[2%] py-[0.5%] flex justify-between">
      {/* 재생 컨트롤 버튼 */}
      <div className="flex flex-row">
        <img src="https://via.placeholder.com/50" alt="previous music btn" />
        <img src="https://via.placeholder.com/50" alt="play or stop btn" />
        <img src="https://via.placeholder.com/50" alt="next music btn" />
        <img src="https://via.placeholder.com/50" alt="replay btn" />
      </div>
      {/* 음악 정보 */}
      <div className="flex flex-row space-x-4">
        <img src="https://via.placeholder.com/50" alt="album cover" />
        <div className="flex flex-col justify-center items-center">
          <p className="">music title</p>
          <p className="text-gray-400">artist name</p>
        </div>
      </div>
      {/* 볼륨 조절 */}
      <div className="flex flex-row">
        <img src="https://via.placeholder.com/50" alt="volume down btn" />
        <img src="https://via.placeholder.com/50" alt="volume bar" />
        <img src="https://via.placeholder.com/50" alt="volume up btn" />
      </div>
    </div>
  );
}
