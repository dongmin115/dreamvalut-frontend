/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { IconButton, SvgIconProps } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { disLikes, likes } from '@/api/music';

type ColorType = SvgIconProps['color'];
type FontSizeType = SvgIconProps['fontSize'];

export default function FavoriteButton({
  color,
  fontSize,
  likes_flag,
  track_id,
  likes_count,
  count_visible,
}: {
  color: ColorType;
  fontSize: FontSizeType;
  likes_flag: boolean;
  track_id: number;
  likes_count: number;
  count_visible: boolean;
}) {
  const [isLiked, setIsLiked] = useState<boolean>(likes_flag);
  const [likeCount, setLikeCount] = useState<number>(likes_count);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    if (isLiked) {
      disLikes(track_id.toString());
      setLikeCount(likeCount - 1);
    }

    if (!isLiked) {
      likes(track_id.toString());
      setLikeCount(likeCount + 1);
    }
  };
  return (
    <>
      {isLiked ? (
        <>
          <IconButton onClick={onClick}>
            <Favorite color={color} fontSize={fontSize} />
          </IconButton>
          {count_visible ? (
            <p className="w-fit text-center text-sm text-white lg:text-sm xl:text-base 2xl:text-lg">
              {likeCount}
            </p>
          ) : null}
        </>
      ) : (
        <>
          <IconButton onClick={onClick}>
            <FavoriteBorder color={color} fontSize={fontSize} />
          </IconButton>
          {count_visible ? (
            <p className="w-fit text-center text-sm text-white lg:text-sm xl:text-base 2xl:text-lg">
              {likeCount}
            </p>
          ) : null}
        </>
      )}
    </>
  );
}
