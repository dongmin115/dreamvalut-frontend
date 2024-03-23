/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import MusicBar from './components/Musicbar/Musicbar';
import NavBar from './components/NavigationBar';
// App 컴포넌트
export default function Home() {
  return (
    <>
      <NavBar />
      <MusicBar />
    </>
  );
}
