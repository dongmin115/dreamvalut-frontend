/* eslint-disable import/extensions */
import MusicBar from '../components/Musicbar/Musicbar';
import NavBar from '../components/NavBar/NavigationBar';

export default function Mypage() {
  return (
    <>
      <NavBar />
      <MusicBar />
      <div className="w-screen pl-[15%] bg-black h-screen"></div>
    </>
  );
}
