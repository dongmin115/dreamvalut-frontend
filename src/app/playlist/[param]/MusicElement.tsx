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
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2';
import { deleteTrack } from '@/api/playlist.ts';
import theme from '../../styles/theme.ts';

export default function MusicElement({
  image,
  title,
  like,
  isLiked,
  trackId,
  playlistId,
  isEdit,
}: MusicElementProps) {
  const [isLikedStore, setIsLikedStore] = useState(isLiked);
  const [deleteAnimation, setDeleteAnimation] = useState(false);
  const [isTrack, setIsTrack] = useState(true);
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
      disLikes(trackId.toString()).catch(() => {
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
      likes(trackId.toString()).catch(() => {
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

  const clearMusic = () => {
    Swal.fire({
      title: '정말 삭제 하시겠어요?',
      text: '삭제하면 되돌릴 수 없어요!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#777',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'swal2-dark', // 여기에 다크 테마 클래스 추가
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTrack(playlistId, trackId.toString())
          .then(() => {
            setDeleteAnimation(true);
            setTimeout(() => {
              setIsTrack(false);
            }, 500);
          })
          .catch(() => {});
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {isTrack && (
        <div
          className={`hover-bg-opacity flex w-full flex-row items-center justify-start py-4 ${deleteAnimation ? 'transform-playlist-delete' : null} `}
        >
          <div
            className={`flex items-center justify-center ${isEdit ? 'transform-playlist-edit transform-playlist-opacity' : 'transform-playlist-normal opacity-0'}`}
          >
            {isEdit ? (
              <IconButton className="mx-2" onClick={clearMusic}>
                <CancelIcon
                  className="h-10 w-10"
                  color="error"
                  fontSize="large"
                />
              </IconButton>
            ) : (
              <div className="w-14" />
            )}
          </div>
          <Link
            href={`/track/${trackId}`}
            className={`flex w-full flex-row items-center ${isEdit ? 'transform-playlist-edit' : 'transform-playlist-normal'}`}
          >
            <img
              src={image}
              alt="Album cover"
              className="h-24 w-24 rounded-lg"
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
      )}
    </ThemeProvider>
  );
}
