/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import api from './axios_interceptor';

async function getUser(setName: any) {
  try {
    const response = await api.get('/users');
    setName(response.data.display_name);
    return response.data;
  } catch (error) {
    console.error('유저 정보 요청 실패:', error);
    throw error;
  }
}

export default getUser;
