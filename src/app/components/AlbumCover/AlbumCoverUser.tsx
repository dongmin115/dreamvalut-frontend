/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @next/next/no-img-element

type AlbumCoverUserProps = {
  image1: string;
  image2: string;
  image3: string;
  title: string;
};
function AlbumCoverUser({
  image1,
  image2,
  image3,
  title,
}: AlbumCoverUserProps) {
  return (
    <div className="flex flex-col w-56 h-72 items-center justify-center my-4 cursor-pointer hover-bg-opacity pt-8">
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
      <p className="text-lg text-white text-center mt-20">{title}</p>
    </div>
  );
}

export default AlbumCoverUser;
