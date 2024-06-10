/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import api from './axios_interceptor';

export async function getStreamTrack(pageIndex: number, size: number) {
  try {
    const response = await api.get(
      `/tracks/users/played?page=${pageIndex}&size=${size}`,
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
    const response = await api.get(`/tags/list?page=${pageIndex}&size=12`);
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
    const response = await api.post('/playlists', {
      playlist_name: playlistName,
      is_public: isPublic,
    });
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (add playlist):', error);
    throw error;
  }
}

// 팔로우한 플레이리스트 데이터 가져오기
export async function fetchFollowPlaylistData() {
  try {
    const response = await api.get(
      '/playlists/users/followed?type=user_created&page=0&size=60', // 하드코딩 수정 필요
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (followed playlists):', error);
    throw error;
  }
}

// 내 플레이리스트 목록(썸네일) 가져오기
export async function fetchMyPlaylistThumbnail() {
  try {
    const response = await api.get(
      '/playlists/users/created?page=0&size=30', // 하드코딩 수정 필요
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (my playlists thumbnail):', error);
    throw error;
  }
}

// 좋아요한 플레이리스트 목록(썸네일) 가져오기
export async function fetchLikePlaylistThumbnail() {
  try {
    const response = await api.get('/users/liked');
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (liked playlists thumbnail):', error);
    throw error;
  }
}

// 최근 감상한 곡 목록 가져오기
export async function getRecentList(page: number, size: number) {
  try {
    const response = await api.get(
      `/tracks/users/played?page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (recent playlists):', error);
    throw error;
  }
}

// 장르별 플레이리스트 목록 가져오기
export async function fetchGenrePlaylist() {
  try {
    const response = await api.get('/genres?page=0&size=100');
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (genre playlists):', error);
    throw error;
  }
}

// 모든 플레이리스트 목록 가져오기
export async function fetchAllPlaylist(pageIndex: number) {
  try {
    const response = await api.get(
      `/playlists?type=user_created&page=${pageIndex}`,
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
    const response = await api.get(
      `/playlists?type=curated&page=${pageIndex}&size=12`,
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (genre playlists):', error);
    throw error;
  }
}

// 플레이리스트 상세 정보 가져오기
export async function getPlaylistMusic(
  playlistType: string,
  playlistId: number,
  pageIndex: number,
  size: number,
) {
  try {
    if (playlistType === 'user_created') {
      const response = await api.get(
        `/playlists/${playlistId}?page=${pageIndex}&size=${size}`,
      );
      return response.data;
    } else if (playlistType === 'tag') {
      const response = await api.get(
        `/tags/${playlistId}/tracks?page=${pageIndex}&size=${size}`,
      );
      return response.data;
    } else if (playlistType === 'genre') {
      const response = await api.get(
        `/genres/${playlistId}/tracks?page=${pageIndex}&size=${size}`,
      );
      return response.data;
    } else if (playlistType === 'like') {
      const response = await api.get(
        `/users/liked/tracks?page=${pageIndex}&size=${size}`,
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
    const response = await api.get(
      `/tags/${tagId}/tracks?page=${pageIndex}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (tag detail):', error);
    throw error;
  }
}

// 플레이리스트 수정
export async function patchPlaylistName(
  playlistId: number,
  playlistName: string,
) {
  try {
    const response = await api.patch(`/playlists/${playlistId}`, {
      playlist_name: playlistName,
    });
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (patch playlist name):', error);
    throw error;
  }
}

// 플레이리스트 삭제
export async function deletePlaylist(playlistId: number) {
  try {
    const response = await api.delete(`/playlists/${playlistId}`);
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (delete playlist):', error);
    throw error;
  }
}

// 플레이리스트 팔로우
export async function postFollow(playlistId: number) {
  try {
    const response = await api.post(`/playlists/${playlistId}/follow`, {});
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (follow playlist):', error);
    throw error;
  }
}

// 플레이리스트 언팔로우
export async function deleteFollow(playlistId: number) {
  try {
    const response = await api.delete(`/playlists/${playlistId}/follow`);
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (unfollow playlist):', error);
    throw error;
  }
}

// 나의 플레이리스트에서 음악 삭제
export async function deleteTrack(playlistId: number, trackId: string) {
  try {
    const response = await api.delete(
      `/playlists/${playlistId}/tracks/${trackId}`,
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
    const response = await api.get(
      `/genres/${genreId}/tracks?page=${pageIndex}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (genre detail):', error);
    throw error;
  }
}
