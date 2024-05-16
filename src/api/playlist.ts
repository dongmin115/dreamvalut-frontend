/* eslint-disable no-else-return */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import axios from 'axios';
import { getCookie } from '@/app/Cookies';

export async function getStreamTrack(pageIndex: number, size: number) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tracks/users/played?page=${pageIndex}&size=${size}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (stream track):', error);
    throw error;
  }
}

// 플레이리스트 생성
export async function fetchTags(pageIndex: number) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tags/list?page=${pageIndex}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (popular tags):', error);
    throw error;
  }
}

// 플레이리스트 생성
export async function fetchAddPlaylist(
  playlistName: string,
  isPublic: boolean,
) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/playlists`,
      {
        playlist_name: playlistName,
        is_public: isPublic,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (add playlist):', error);
    throw error;
  }
}

// 팔로우한 플레이리스트 데이터 가져오기
export async function fetchFollowPlaylistData() {
  const accessToken = await getCookie('accessToken');
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/playlists/users/followed?type=user_created&page=0&size=60`, // 하드코딩 수정 필요
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (followed playlists):', error);
    throw error;
  }
}

// 내 플레이리스트 목록(썸네일) 가져오기
export async function fetchMyPlaylistThumbnail() {
  const accessToken = await getCookie('accessToken');
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/playlists/users/created?page=0&size=30`, // 하드코딩 수정 필요
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (my playlists thumbnail):', error);
    throw error;
  }
}

// 좋아요한 플레이리스트 목록(썸네일) 가져오기
export async function fetchLikePlaylistThumbnail() {
  const accessToken = await getCookie('accessToken');
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/liked`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (liked playlists thumbnail):', error);
    throw error;
  }
}

// 최근 감상한 곡 목록 가져오기
export async function getRecentList() {
  try {
    const response = await axios.get('/api/v1/users/tracks/played');
    return response.data.data;
  } catch (error) {
    console.error('API Fetch Error (recent playlists):', error);
    throw error;
  }
}

// 장르별 플레이리스트 목록 가져오기
export async function fetchGenrePlaylist(pageIndex: number) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/genres?page=${pageIndex}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (genre playlists):', error);
    throw error;
  }
}

// 모든 플레이리스트 목록 가져오기
export async function fetchAllPlaylist(pageIndex: number) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/playlists?type=user_created&page=${pageIndex}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (genre playlists):', error);
    throw error;
  }
}

// 시스템 플레이리스트 목록 가져오기
export async function fetchSystemPlaylist(pageIndex: number) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/playlists?type=curated&page=${pageIndex}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (genre playlists):', error);
    throw error;
  }
}

// 플레이리스트 상세 정보 가져오기
export async function fetchPlaylistDetail(
  playlistId: string,
  pageIndex: number,
  size: number,
) {
  try {
    const accessToken = await getCookie('accessToken');
    if (playlistId === 'like') {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/liked/tracks?page=${pageIndex}&size=${size}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/playlists/${playlistId}?page=${pageIndex}&size=${size}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    }
  } catch (error) {
    console.error('API Fetch Error (playlist detail):', error);
    throw error;
  }
}

// 태그 상세정보 가져오기
export async function fetchTagDetail(
  tagId: string,
  pageIndex: number,
  size: number,
) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tags/${tagId}/tracks?page=${pageIndex}&size=${size}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (tag detail):', error);
    throw error;
  }
}

// 플레이리스트 수정
export async function patchPlaylistName(
  playlistId: string,
  playlistName: string,
) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/playlists/${playlistId}`,
      {
        playlist_name: playlistName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (patch playlist name):', error);
    throw error;
  }
}

// 플레이리스트 삭제
export async function deletePlaylist(playlistId: string) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/playlists/${playlistId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (delete playlist):', error);
    throw error;
  }
}

// 플레이리스트 팔로우
export async function postFollow(playlistId: string) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/playlists/${playlistId}/follow`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (follow playlist):', error);
    throw error;
  }
}

// 플레이리스트 언팔로우
export async function deleteFollow(playlistId: string) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/playlists/${playlistId}/follow`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (unfollow playlist):', error);
    throw error;
  }
}

// 나의 플레이리스트에서 음악 삭제
export async function deleteTrack(playlistId: string, trackId: string) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/playlists/${playlistId}/tracks/${trackId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (delete music from playlist):', error);
    throw error;
  }
}

// 특정 장르의 모든 곡 가져오기
export async function fetchGenreDetail(
  genreId: string,
  pageIndex: number,
  size: number,
) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/genres/${genreId}/tracks?page=${pageIndex}&size=${size}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (genre detail):', error);
    throw error;
  }
}
