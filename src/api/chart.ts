/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import api from './axios_interceptor';

export async function fetchChartData(page: number, size: number) {
  try {
    const response = await api.get(`/tracks/charts?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error('API Fetch Error (chart data) : ', error);
    throw error;
  }
}

export default fetchChartData;
