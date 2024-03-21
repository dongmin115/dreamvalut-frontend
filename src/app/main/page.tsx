/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved

import MusicBar from '../components/Musicbar/Musicbar';
import NavigationBar from '../components/NavigationBar';

function page() {
  return (
    <div className="w-screen h-full flex flex-col justify-start">
      <NavigationBar />
      <MusicBar />

      <div className="w-full h-full ml-64 bg-gray-900">
        <h1 className="mt-text-2xl">인기 차트</h1>
      </div>
    </div>
  );
}

export default page;
