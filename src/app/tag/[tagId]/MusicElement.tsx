'use client';

/* eslint-disable @next/next/no-img-element */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */

import { MusicElementProps } from '@/types/playlist.ts';
import numeral from 'numeral';
import { IconButton, ThemeProvider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { likes, disLikes } from '@/api/music.ts';
import { useState } from 'react';
import Link from 'next/link';
import theme from '../../styles/theme.ts';

export default function MusicElement({
  image,
  title,
  like,
  isLiked,
  trackId,
}: MusicElementProps) {
  const [isLikedStore, setIsLikedStore] = useState(isLiked);
  const [likeStore, setLikeStore] = useState(like);
  const [formattedLike, setFormattedLike] = useState(
    likeStore > 999
      ? numeral(likeStore).format('0.0a')
      : numeral(likeStore).format('0a'),
  );

  const handleLike = async () => {
    if (isLikedStore) {
      setIsLikedStore(false);
      setLikeStore(likeStore - 1);
      setFormattedLike(
        likeStore > 999
          ? numeral(likeStore - 1).format('0.0a')
          : numeral(likeStore - 1).format('0a'),
      );
      disLikes(trackId).catch(() => {
        // API 호출이 실패하면 상태를 되돌립니다
        setIsLikedStore(true);
        setLikeStore(likeStore);
        setFormattedLike(
          likeStore > 999
            ? numeral(likeStore).format('0.0a')
            : numeral(likeStore).format('0a'),
        );
      });
    } else {
      setIsLikedStore(true);
      setLikeStore(likeStore + 1);
      setFormattedLike(
        likeStore > 999
          ? numeral(likeStore + 1).format('0.0a')
          : numeral(likeStore + 1).format('0a'),
      );
      likes(trackId).catch(() => {
        // API 호출이 실패하면 상태를 되돌립니다
        setIsLikedStore(false);
        setLikeStore(likeStore);
        setFormattedLike(
          likeStore > 999
            ? numeral(likeStore).format('0.0a')
            : numeral(likeStore).format('0a'),
        );
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className={
          'hover-bg-opacity flex w-full flex-row items-center justify-start py-4'
        }
      >
        <Link
          href={`/track/${trackId}`}
          className={'flex w-full flex-row items-center'}
        >
          <img
            src={image}
            alt="Album cover"
            className="ml-10 h-24 w-24 rounded-lg"
          />
          <p className="mx-6 flex text-2xl">{title}</p>
        </Link>

        <div className="flex w-2/12 items-center justify-center text-2xl">
          <IconButton onClick={handleLike}>
            {isLikedStore ? (
              <FavoriteIcon color="primary" fontSize="inherit" />
            ) : (
              <FavoriteBorderIcon color="primary" />
            )}
          </IconButton>

          {formattedLike}
        </div>
        <div className="flex w-24 items-center justify-center">
          <IconButton>
            <PlayArrowIcon color="primary" fontSize="large" />
          </IconButton>
        </div>
      </div>
    </ThemeProvider>
  );
}
