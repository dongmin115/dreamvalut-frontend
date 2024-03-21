/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */
import NavBar from '../components/NavigationBar';

export default function MusicPage() {
  return (
    <div className="flex w-screen h-screen">
      <NavBar />
      <img
        src="https://i.ibb.co/hLxvjJG/1.jpg"
        alt="1"
        className="w-full h-full blur -z-10"
      />
    </div>
  );
}
