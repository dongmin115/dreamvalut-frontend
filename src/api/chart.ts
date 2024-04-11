/* eslint-disable no-console */
import axios from 'axios';

export async function fetchChartData() {
  try {
    const response = await axios.get('/api/v1/charts');
    return response.data.data.tracks;
  } catch (error) {
    console.error('API Fetch Error :', error);
    throw error;
  }
}

export default fetchChartData;
