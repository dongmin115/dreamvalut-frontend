import { albumCoverUserProps } from '@/types/albumCover.ts';
import Image from 'next/image';

function AlbumCoverUser({
  image1,
  image2,
  image3,
  title,
}: albumCoverUserProps) {
  return (
    <div className="flex flex-col w-56 h-72 items-center justify-center m-4 cursor-pointer hover-bg-opacity pt-8">
      <Image
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
      />
      <p className="text-lg text-white text-center mt-20">{title}</p>
    </div>
  );
}

export default AlbumCoverUser;
