const getMusic = async (trackId: number) => {
  try {
    const response = await fetch(`/api/v1/tracks/${trackId}`);
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
