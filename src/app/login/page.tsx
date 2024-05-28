/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */

'use client';

import React from 'react';
import { KakaoLogin, NaverLogin, GoogleLogin } from '@/api/login.ts';

// 클라이언트 코드에서 실제 서버로 POST 요청을 보내는 방식
const LogIn = () => (
  <>
    <div className="fade-in-box flex h-screen flex-col items-center justify-center">
      <img
        src="https://i.ibb.co/1GnSm8z/Dream-Vault-Png.png"
        alt="DreamVault-logo-img"
        className="mb-[1%] w-[5%]"
      />
      <p className="z-10 mb-10 text-2xl text-white md:text-3xl lg:text-4xl">
        Welcome To <span className="z-10 text-violet-600">DreamVault.</span>
      </p>
      <p className="z-10 mb-16 text-6xl text-white">당신의 꿈을 열어보세요.</p>
      <div className="LogInBtns z-10 mb-4 flex h-[5%] w-1/5 items-center justify-center rounded-xl p-1">
        <img
          src="https://i.ibb.co/fQ4ZGZ8/image.png"
          alt="googleimage"
          className="h-10 w-10 rounded-full"
        />
        <button onClick={GoogleLogin} className="ml-10 text-xl">
          구글로 로그인
        </button>
      </div>
      <div className="LogInBtns z-10 mb-4 flex h-[5%] w-1/5 items-center justify-center rounded-xl p-1">
        <img
          src="https://i.ibb.co/9Y7CRMr/image.png"
          alt="kakaoimage"
          className="h-10 w-10 rounded-full"
        />

        <button onClick={KakaoLogin} className="ml-10 text-xl">
          카카오톡으로 로그인
        </button>
      </div>
      <div className="LogInBtns z-10 mb-4 flex h-[5%] w-1/5 items-center justify-center rounded-xl p-1">
        <img
          src="https://i.ibb.co/Y8Q9dVv/image.png"
          alt="naverimage"
          className="h-10 w-10 rounded-full"
        />

        <button onClick={NaverLogin} className="ml-10 text-xl">
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
export default LogIn;
