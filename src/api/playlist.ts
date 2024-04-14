/* eslint-disable no-console */
import axios from 'axios';

// 팔로우한 플레이리스트 데이터 가져오기
export async function fetchFollowPlaylistData() {
  try {
    const response = await axios.get('/api/v1/users/playlists/followed');
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
