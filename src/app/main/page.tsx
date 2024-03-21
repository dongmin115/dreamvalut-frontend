import MusicBar from '../components/Musicbar/Musicbar';
import NavigationBar from '../components/NavigationBar';

function page() {
  return (
    <div className="w-screen h-screen flex flex-col justify-start">
      <NavigationBar />
      <MusicBar />
      <h1 className="text-2xl">인기 차트</h1>
    </div>
  );
}

export default page;
