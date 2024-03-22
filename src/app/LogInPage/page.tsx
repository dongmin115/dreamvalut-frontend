/* eslint-disable @next/next/no-img-element */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const LogIn = () => {
  const router = useRouter();

  const handleLogin = () => {
    // 로그인 처리를 한 뒤 다른 페이지로 이동하도록 설정
    router.push('/another-page');
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col h-screen fade-in-box">
        <p className="text-4xl text-white mb-10 z-10">
          Welcome To <span className="text-violet-600 z-10">DreamVault.</span>
        </p>
        <p className="text-6xl text-white mb-16 z-10">
          당신의 꿈을 열어보세요.
        </p>
        <div className="flex LogInBtns justify-center items-center mb-4 p-1 w-1/5 rounded-xl z-10">
          <img
            src="https://i.ibb.co/fQ4ZGZ8/image.png"
            alt="googleimage"
            className="w-10 h-10 rounded-full"
          />
          <button onClick={handleLogin} className="text-xl ml-10">
            구글로 로그인
          </button>
        </div>
        <div className="flex LogInBtns justify-center items-center mb-4 p-1 w-1/5 rounded-xl z-10">
          <img
            src="https://i.ibb.co/9Y7CRMr/image.png"
            alt="kakaoimage"
            className="w-10 h-10 rounded-full"
          />
          <button onClick={handleLogin} className="text-xl ml-10">
            카카오톡으로 로그인
          </button>
        </div>
        <div className="flex LogInBtns justify-center items-center mb-4 p-1 w-1/5 rounded-xl z-10">
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
