const getMusic = async () => {
  try {
    const response = await fetch('/api/v1/tracks/track_id');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseJson = await response.json();

    return responseJson.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};
export default getMusic;
