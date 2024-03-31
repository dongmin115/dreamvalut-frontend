/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// 클라이언트 코드에서 실제 서버로 POST 요청을 보내는 방식
const LogIn = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider: 'kakao' }), // 카카오 로그인을 가정
      });

      // 응답 확인
      if (!response.ok) {
        throw new Error('로그인에 실패했습니다.');
      }

      const data = await response.json();
      console.log(data); // 로그인 성공 시 응답 데이터를 콘솔에 출력
      router.push('/GenrePage'); // 로그인 성공 시 다음 페이지로 이동
    } catch (error: any) {
      console.error(error.message); // 오류 메시지 출력
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col h-screen fade-in-box">
        <img
          src="https://i.ibb.co/1GnSm8z/Dream-Vault-Png.png"
          alt="DreamVault-logo-img"
          className="w-[5%] mb-[1%]"
        />
        <p className="text-4xl text-white mb-10 z-10">
          Welcome To <span className="text-violet-600 z-10">DreamVault.</span>
        </p>
        <p className="text-6xl text-white mb-16 z-10">
          당신의 꿈을 열어보세요.
        </p>
        <div className="flex h-[5%] LogInBtns justify-center items-center mb-4 p-1 w-1/5 rounded-xl z-10">
          <img
            src="https://i.ibb.co/fQ4ZGZ8/image.png"
            alt="googleimage"
            className="w-10 h-10 rounded-full"
          />
          <button
            onClick={() => {
              window
                .fetch('https://api.example.com/api/user')
                .then((res) => res.json())
                .then((data) => console.log(data));
            }}
            className="text-xl ml-10"
          >
            구글로 로그인
          </button>
        </div>
        <div className="flex h-[5%] LogInBtns justify-center items-center mb-4 p-1 w-1/5 rounded-xl z-10">
          <img
            src="https://i.ibb.co/9Y7CRMr/image.png"
            alt="kakaoimage"
            className="w-10 h-10 rounded-full"
          />
          <button onClick={handleLogin} className="text-xl ml-10">
            카카오톡으로 로그인
          </button>
        </div>
        <div className="flex h-[5%] LogInBtns justify-center items-center mb-4 p-1 w-1/5 rounded-xl z-10">
          <img
            src="https://i.ibb.co/Y8Q9dVv/image.png"
            alt="naverimage"
            className="w-10 h-10 rounded-full"
          />
          <button onClick={handleLogin} className="text-xl ml-10">
            네이버로 로그인
          </button>
        </div>
        <div className="z-1">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
