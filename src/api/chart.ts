/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import axios from 'axios';
import { getCookie } from '@/app/Cookies';

export async function fetchChartData() {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.get('/api/v1/charts', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data.tracks;
  } catch (error) {
    console.error('API Fetch Error (chart data) : ', error);
    throw error;
  }
}

export default fetchChartData;
