/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */

'use client';

import React from 'react';
import { KakaoLogin, NaverLogin, GoogleLogin } from '@/api/login.ts';
import Image from 'next/image';

// 클라이언트 코드에서 실제 서버로 POST 요청을 보내는 방식
const LogIn = () => (
  <>
    <div className="fade-in-box flex h-screen flex-col items-center justify-center">
      <img
        src="https://i.ibb.co/1GnSm8z/Dream-Vault-Png.png"
        alt="DreamVault-logo-img"
        className="mb-[1%] w-[5%]"
      />
      <p className="z-10 mb-10 text-4xl text-white">
        Welcome To <span className="z-10 text-violet-600">DreamVault.</span>
      </p>
      <p className="z-10 mb-16 text-6xl text-white">당신의 꿈을 열어보세요.</p>
      <div className="LogInBtnsGoogle z-10 mb-4 flex h-[5%] w-1/6 items-center justify-start rounded-md">
        <div className="flex h-10 w-10 justify-start">
          <div className="relative h-full w-full">
            <Image
              src="https://i.ibb.co/09htLD8/web-neutral-sq-na-2x.png"
              alt="googleimage"
              fill={true} // 부모 컨테이너를 채우도록 설정
              objectFit="cover" // 이미지가 부모 컨테이너에 맞게 조정됨
            />
          </div>
        </div>
        <button
          onClick={GoogleLogin}
          className="ml-[25%] text-base font-medium"
        >
          구글 로그인
        </button>
      </div>
      <div className="LogInBtnsKakao z-10 mb-4 flex h-[5%] w-1/6 items-center justify-start rounded-md">
        <div className="flex h-10 w-10 justify-start">
          <div className="relative h-full w-full">
            <Image
              src="https://i.ibb.co/r6y52R7/kakaotalk-sharing-btn-small-ov.png"
              alt="kakaoimage"
              fill={true}
              objectFit="cover"
            />
          </div>
        </div>
        <button onClick={KakaoLogin} className="ml-[25%] text-base font-medium">
          카카오 로그인
        </button>
      </div>
      <div className="LogInBtnsNaver z-10 mb-4 flex h-[5%] w-1/6 items-center justify-start rounded-md">
        <div className="flex h-10 w-10 justify-start">
          <div className="relative h-full w-full">
            <Image
              src="https://i.ibb.co/wYf09Y3/btn-G.png"
              alt="naverimage"
              fill={true}
              objectFit="cover"
            />
          </div>
        </div>
        <button onClick={NaverLogin} className="ml-[25%] text-base font-medium">
          네이버 로그인
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
