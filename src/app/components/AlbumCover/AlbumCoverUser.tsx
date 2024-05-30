/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { albumCoverUserProps } from '@/types/albumCover.ts';
import Link from 'next/link';
import Image from 'next/image';

function AlbumCoverUser({
  image1,
  image2,
  image3,
  title,
  Id,
}: albumCoverUserProps) {
  return (
    <Link
      href={`playlist/${Id}`}
      className="hover-bg-opacity flex h-60 w-60 cursor-pointer flex-col items-center justify-center p-4 pt-10 xl:h-64 2xl:h-80"
    >
      <figure className="relative z-30 h-32 w-32 rounded-lg xl:h-36 xl:w-36 2xl:h-40 2xl:w-40">
        <Image
          src={image1}
          alt="Album cover"
          className="z-30 rounded-lg"
          layout="fill"
          objectFit="cover"
        />
      </figure>
      <figure className="relative z-20 -mt-32 h-28 w-28 rounded-lg xl:-mt-36 xl:h-32 xl:w-32 2xl:-mt-44 2xl:h-36 2xl:w-36">
        <Image
          src={image2}
          alt="Album cover"
          className="z-20 rounded-lg"
          layout="fill"
          objectFit="cover"
        />
      </figure>
      <figure className="relative z-10 -mt-28 h-24 w-24 rounded-lg xl:-mt-32 xl:h-28 xl:w-28 2xl:-mt-40 2xl:h-32 2xl:w-32">
        <Image
          src={image3}
          alt="Album cover"
          className="z-10 rounded-lg"
          layout="fill"
          objectFit="cover"
        />
      </figure>
      <p className="text-md mt-16 h-16 text-center font-bold text-white xl:mt-20 xl:text-lg">
        {title}
      </p>
    </Link>
  );
}

export default AlbumCoverUser;
