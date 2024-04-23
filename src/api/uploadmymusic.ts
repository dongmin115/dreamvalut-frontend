/* eslint-disable consistent-return */
// import { Genre } from '@/types/genre.ts';
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
  try {
    const response = await axios.post('/api/v1/tracks', {
      track_info: {
        title,
        prompt,
        has_lyrics: hasLyrics,
        tags,
        genre_id: genreId,
      },
      track_image: trackImage,
      track_audio: trackAudio,
    });
    if (response.data) {
      return response.data.data; // 장르 데이터 반환
    }
  } catch (error) {
    console.error('오류 발생', error);
    throw new Error('API 호출 중 오류 발생');
  }
};

export default uploadMymusic;
