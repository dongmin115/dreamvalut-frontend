/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */

import axios from 'axios';

export async function fetchChartData() {
  try {
    const response = await axios.get('/api/v1/charts');
    return response.data.data.tracks;
  } catch (error) {
    console.error('api안됨 안됨:', error);
    throw error;
  }
}

export default fetchChartData;
