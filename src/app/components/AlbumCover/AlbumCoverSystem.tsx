/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @next/next/no-img-element
function AlbumCoverSystem() {
  const image = 'https://i.ibb.co/k55YHSL/Perfect-Night.jpg';
  return (
    <div className="flex flex-col w-48 items-center justify-center mt-8">
      <img src={image} alt="Album cover" className="h-48 w-48 rounded-lg" />
      <div className="h-48 w-48 rounded-lg z-10 -mt-48 bg-blue-400 opacity-50" />
      <p className="text-white text-xl z-20 font-bold -mt-28">K-POP Top 100</p>
    </div>
  );
}

export default AlbumCoverSystem;
