/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: any) => {
  cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => cookies.get(name);

export const removeCookie = (name: string, option?: any) =>
  cookies.remove(name, { ...option });
