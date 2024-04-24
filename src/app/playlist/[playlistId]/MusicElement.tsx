'use client';

/* eslint-disable @next/next/no-img-element */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */

import { MusicElementProps } from '@/types/playlist.ts';
import numeral from 'numeral';
import { IconButton, ThemeProvider } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import theme from '../../styles/theme.ts';

export default function MusicElement({
  image,
  title,
  like,
  isLiked,
}: MusicElementProps) {
  const formattedLike =
    like > 999 ? numeral(like).format('0.0a') : numeral(like).format('0a');
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-row w-full justify-start py-4 items-center hover-bg-opacity">
        <div className="flex flex-row w-full px-12 items-center">
          <img src={image} alt="Album cover" className="h-24 w-24 rounded-lg" />
          <p className="flex mx-6 text-2xl">{title}</p>
        </div>
        <div className="flex w-2/12 text-2xl justify-center items-center">
          <IconButton>
            {isLiked ? (
              <FavoriteIcon color="primary" fontSize="inherit" />
            ) : (
              <FavoriteBorderIcon color="primary" />
            )}
          </IconButton>

          {formattedLike}
        </div>
        <div className="flex w-24 justify-center items-center">
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
