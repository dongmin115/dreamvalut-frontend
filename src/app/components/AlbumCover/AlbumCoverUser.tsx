/* eslint-disable operator-linebreak */

import { albumCoverUserProps } from '@/types/albumCover.ts';
import Link from 'next/link';
import Image from 'next/image';

function AlbumCoverUser({
  image1,
  image2,
  image3,
  title,
  id,
}: albumCoverUserProps) {
  const href =
    id !== -1 ? `playlist/type=user_created&id=${id}` : 'playlist/type=like';
  return (
    <Link
      href={href}
      className="hover-bg-opacity flex h-60 w-40 cursor-pointer flex-col items-center justify-start p-4 pt-10 xl:h-64 xl:w-48 xl:pt-10 2xl:h-72 2xl:w-48 2xl:pt-10"
    >
      <div className="flex flex-col items-center justify-start">
        <figure className="relative z-30 h-32 w-32 rounded-lg xl:h-36 xl:w-36 2xl:h-40 2xl:w-40">
          <Image
            src={image1}
            alt="Album cover"
            className="z-30 rounded-lg"
            fill
            sizes="100vm"
          />
        </figure>
        <figure className="relative z-20 -mt-[8.75rem] h-28 w-28 rounded-lg xl:-mt-[9.75rem] xl:h-32 xl:w-32 2xl:-mt-44 2xl:h-36 2xl:w-36">
          <Image
            src={image2}
            alt="Album cover"
            className="z-20 rounded-lg"
            fill
            sizes="100vm"
          />
        </figure>
        <figure className="relative z-10 -mt-[7.75rem] h-24 w-24 rounded-lg xl:-mt-[8.75rem] xl:h-28 xl:w-28 2xl:-mt-40 2xl:h-32 2xl:w-32">
          <Image
            src={image3}
            alt="Album cover"
            className="z-10 rounded-lg"
            fill
            sizes="100vm"
          />
        </figure>
      </div>
      <p className="text-md mt-16 h-16 text-center font-bold text-white xl:mt-16 xl:text-lg 2xl:mt-20 2xl:text-lg">
        {title}
      </p>
    </Link>
  );
}

export default AlbumCoverUser;
