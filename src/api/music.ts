/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import api from './axios_interceptor';

export const getMusic = async (trackId: number | null) => {
  try {
    const response = await api.get(`/tracks/${trackId}`);
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};

export const postStream = async (trackId: number) => {
  try {
    const response = await api.post(`/tracks/${trackId}/stream_events`, {
      track_id: trackId,
    });
    return response;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};

export const likes = async (trackId: string) => {
  try {
    const response = await api.post(`/tracks/${trackId}/likes`, {});
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};

export const disLikes = async (trackId: string) => {
  try {
    const response = await api.delete(`/tracks/${trackId}/disLikes`);
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};

export const fetchSearch = async (
  query: string,
  pageIndex: number,
  size: number,
) => {
  try {
    const response = await api.get(
      `/search?query=${query}&page=${pageIndex}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};
