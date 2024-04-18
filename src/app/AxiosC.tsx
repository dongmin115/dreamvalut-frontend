import axios from 'axios';
import { getCookie } from '@/app/Cookies.tsx';

export default axios.create({
  headers: {
    accessToken: await getCookie('accessToken'),
  },
});
