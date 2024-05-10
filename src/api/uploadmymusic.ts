/* eslint-disable consistent-return */
import { getCookie } from '@/app/Cookies.tsx';
import axios from 'axios';

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
  formData.append('track_info', new Blob([JSON.stringify({
    title,
    prompt,
    has_lyrics: hasLyrics,
    tags,
    genre_id: genreId,
  })], { type: 'application/json' }));
  formData.append('track_image', trackImage as Blob);
  formData.append('track_audio', trackAudio as Blob);

  try {
    const accessToken = getCookie('accessToken');
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tracks`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data) {
      return response.data.data;
    }
  } catch (error) {
    console.error('오류 발생', error);
    throw new Error('API 호출 중 오류 발생');
  }
};

export default uploadMymusic;
