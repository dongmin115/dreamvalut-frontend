/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { albumCoverUserProps } from '@/types/albumCover.ts';

function AlbumCoverUser({
  image1,
  image2,
  image3,
  title,
}: albumCoverUserProps) {
  return (
    <div className="flex flex-col w-56 h-80 items-center justify-center m-4 cursor-pointer hover-bg-opacity pt-8 p-1">
      {/* <Image
        src={image1}
        alt="Album cover"
        className="rounded-lg z-30"
        width={192}
        height={192}
      />
      <Image
        src={image2}
        alt="Album cover"
        className="rounded-lg -mt-52 z-20"
        width={176}
        height={176}
      />
      <Image
        src={image3}
        alt="Album cover"
        className="rounded-lg -mt-48 z-10"
        width={160}
        height={160}
      /> */}
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
      <p className="text-lg h-16 text-white text-center mt-20">{title}</p>
    </div>
  );
}

export default AlbumCoverUser;
