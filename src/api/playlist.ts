/* eslint-disable no-console */
import axios from 'axios';

// 특정 플레이리스트 정보 가져오기
export async function getPlaylist() {
  try {
    // const response = await axios.get(`/api/v1/playlists/${playlistId}`); // 실제 api 연결시 사용
    const response = await axios.get('/api/v1/playlists/playlist_id');
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
}

// 모든 플레이리스트 정보 가져오기
export async function getMyPlaylists() {
  try {
    const response = await axios.get('/api/v1/users/playlists/list');
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
}

export async function fetchAddPlaylist(
  playlistName: string,
  isPublic: boolean,
) {
  try {
    const response = await axios.post('/api/v1/playlists', {
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
    const response = await axios.get('/api/v1/users/playlists/followed');
    console.log(response.data.data.playlists);
    return response.data.data.playlists;
  } catch (error) {
    console.error('API Fetch Error (followed playlists):', error);
    throw error;
  }
}

// 내 플레이리스트 데이터 가져오기
export async function fetchMyPlaylistData() {
  try {
    const response = await axios.get('/api/v1/users/playlists');
    return response.data.data.playlists;
  } catch (error) {
    console.error('API Fetch Error (my playlists):', error);
    throw error;
  }
}

// 내 플레이리스트 목록(썸네일) 가져오기
export async function fetchMyPlaylistThumbnail() {
  try {
    const response = await axios.get('/api/v1/users/playlists/created');
    return response.data.data.playlists;
  } catch (error) {
    console.error('API Fetch Error (my playlists thumbnail):', error);
    throw error;
  }
}

export async function fetchLikePlaylistThumbnail() {
  try {
    const response = await axios.get('/api/v1/users/liked');
    return response.data.data.thumbnails;
  } catch (error) {
    console.error('API Fetch Error (liked playlists thumbnail):', error);
    throw error;
  }
}
