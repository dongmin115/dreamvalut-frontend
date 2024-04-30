/* eslint-disable @next/next/no-img-element */

'use client';

/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */

import { MusicElementProps } from '@/types/playlist.ts';
import numeral from 'numeral';
import { IconButton, ThemeProvider } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fetchAddLike, fetchCancelLike } from '@/api/like.ts';
import theme from '../../styles/theme.ts';

export default function MusicElement({
  image,
  title,
  like,
  isLiked,
  trackId,
}: MusicElementProps) {
  const formattedLike =
    like > 999 ? numeral(like).format('0.0a') : numeral(like).format('0a');

  const handleLike = async () => {
    if (isLiked) {
      await fetchCancelLike(trackId);
    } else {
      await fetchAddLike(trackId);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="hover-bg-opacity flex w-full flex-row items-center justify-start py-4">
        <div className="flex w-full flex-row items-center px-12">
          <img src={image} alt="Album cover" className="h-24 w-24 rounded-lg" />
          <p className="mx-6 flex text-2xl">{title}</p>
        </div>
        <div className="flex w-2/12 items-center justify-center text-2xl">
          <IconButton onClick={handleLike}>
            {isLiked ? (
              <FavoriteIcon color="primary" fontSize="inherit" />
            ) : (
              <FavoriteBorderIcon color="primary" />
            )}
          </IconButton>

          {formattedLike}
        </div>
        <div className="flex w-24 items-center justify-center">
          <IconButton>
            <PlayCircleIcon
              color="primary"
              style={{ fontSize: 50, opacity: 1 }}
            />
          </IconButton>
        </div>
      </div>
    </ThemeProvider>
  );
}
