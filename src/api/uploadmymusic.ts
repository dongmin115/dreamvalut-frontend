/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import Swal from 'sweetalert2';
import api from './axios_interceptor.ts';

// 특정 곡 등록하기
const uploadMymusic = async (
  title: string,
  prompt: string,
  hasLyrics: boolean,
  tags: string[],
  genreId: number,
  trackImage: File,
  trackAudio: File,
) => {
  const formData = new FormData();
  formData.append(
    'track_info',
    new Blob(
      [
        JSON.stringify({
          title,
          prompt,
          has_lyrics: hasLyrics,
          tags,
          genre_id: genreId,
        }),
      ],
      { type: 'application/json' },
    ),
  );
  formData.append('track_image', trackImage as Blob);
  formData.append('track_audio', trackAudio as Blob);

  // 로딩 알림 표시
  Swal.fire({
    title: '등록 중...',
    text: '잠시만 기다려주세요.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await api.post('/tracks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data) {
      Swal.fire({
        title: '나만의 폼 등록 완료',
        text: '성공적으로 등록되었습니다!',
        icon: 'success',
        confirmButtonText: '확인',
      });
      return response.data.data;
    }
  } catch (error) {
    console.error('오류 발생', error);
  }
};

export default uploadMymusic;
