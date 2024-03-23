/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @next/next/no-img-element
function AlbumCoverUser() {
  const image1 = 'https://i.ibb.co/k55YHSL/Perfect-Night.jpg';
  const image2 = 'https://i.ibb.co/k55YHSL/Perfect-Night.jpg';
  const image3 = 'https://i.ibb.co/k55YHSL/Perfect-Night.jpg';
  return (
    <div className="flex flex-col w-48 items-center justify-center mt-8">
      <img
        src={image1}
        alt="Album cover"
        className="h-48 w-48 rounded-lg z-30"
      />
      <img
        src={image2}
        alt="Album cover"
        className="h-44 w-44 rounded-lg -mt-52 z-20"
      />
      <img
        src={image3}
        alt="Album cover"
        className="h-40 w-40 rounded-lg -mt-48 z-10"
      />
      <p className="text-lg text-white text-center mt-20">
        텐션 쫙 올리는 플리 ㅋㅋ
      </p>
    </div>
  );
}

export default AlbumCoverUser;
