/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */

'use client';

import React from 'react';
import { KakaoLogin, NaverLogin, GoogleLogin } from '@/util/login.ts';
import Image from 'next/image';

// 클라이언트 코드에서 실제 서버로 POST 요청을 보내는 방식
const LogIn = () => (
  <>
    <div className="fade-in-box flex h-screen w-screen flex-col items-center justify-center">
      <img
        src="https://i.ibb.co/1GnSm8z/Dream-Vault-Png.png"
        alt="DreamVault-logo-img"
        className="mb-[1%] w-1/6 sm:w-1/12"
      />
      <p className="z-10 mb-10 text-2xl text-white sm:text-4xl">
        Welcome To <span className="z-10 text-violet-600">DreamVault.</span>
      </p>
      <p className="z-10 mb-16 text-2xl text-white sm:text-4xl">
        당신의 꿈을 열어보세요.
      </p>
      <div className="LogInBtnsGoogle z-10 mb-4 flex h-10 w-2/3 items-center justify-start rounded-md sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="flex h-10 w-10 items-center justify-center">
          <img
            src="https://i.ibb.co/09htLD8/web-neutral-sq-na-2x.png"
            alt="googleimage"
            className="h-full w-full object-cover"
          />
        </div>
        <button
          onClick={GoogleLogin}
          className="ml-2 h-10 flex-1 text-base font-medium"
        >
          <span className="block">구글 로그인</span>
        </button>
      </div>

      <div className="LogInBtnsKakao z-10 mb-4 flex h-10 w-2/3 items-center justify-start rounded-md sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="flex h-10 w-10 items-center justify-center">
          <img
            src="https://i.ibb.co/r6y52R7/kakaotalk-sharing-btn-small-ov.png"
            alt="kakaoimage"
            className="h-full w-full object-cover"
          />
        </div>
        <button
          onClick={KakaoLogin}
          className="ml-2 h-10 flex-1 text-base font-medium"
        >
          <span className="block">카카오 로그인</span>
        </button>
      </div>
      <div className="LogInBtnsNaver z-10 mb-4 flex h-10 w-2/3 items-center justify-start rounded-md sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="flex h-10 w-10 items-center justify-center">
          <img
            src="https://i.ibb.co/wYf09Y3/btn-G.png"
            alt="naverimage"
            className="h-full w-full object-cover"
          />
        </div>
        <button
          onClick={NaverLogin}
          className="ml-2 h-10 flex-1 text-base font-medium"
        >
          <span className="block">네이버 로그인</span>
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
