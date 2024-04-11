import axios from 'axios';

export async function getPlaylist() {
  try {
    const response = await axios.get('/api/v1/playlists/playlist_id');
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
}

export default getPlaylist;
