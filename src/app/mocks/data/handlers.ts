/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { HttpResponse, http } from 'msw';
// 가상 데이터
export const handlers = [
  http.get('https://api.example.com/api/user', () => {
    return HttpResponse.json({
      data1: {
        id: 'handongryong',
        pwd: '12345',
        email: 'exampl2131e@example.com',
      },
      data2: {
        id: 'handongryong',
        pwd: 'ㅇㄴㄹㄴㅇㅇㄴ',
        email: 'examplㅎㅎㅎe@example.com',
      },
      data3: {
        id: 'handongryong',
        pwd: '12211433ㅇㄹ',
        email: 'examplㅁㅁㅁe@example.com',
      },
      data4: {
        id: 'handongryong',
        pwd: 'ㄴㄻㄴㄹㅇㄴ23312',
        email: 'exampl2222e@example.com',
      },
    });
  }),
];
