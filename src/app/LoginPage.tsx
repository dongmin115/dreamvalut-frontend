'use client';

import React from 'react';
import './index.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import naverlogo from '../images/네이버로고.png';
import kakaologo from '../images/카카오톡로고.png';
import googlelogo from '../images/구글로고.png';

const LogIn = () => {
  const router = useRouter();

  const handleLogin = () => {
    // 로그인 처리를 한 뒤 다른 페이지로 이동하도록 설정
    router.push('/another-page');
  };

  return (
    <>
    <div className='tongtong_img'>

    </div>
    <div className='flex justify-center items-center flex-col h-screen fade-in-box'>
    <p className='text-4xl text-white mb-10'>Welcome To <span className='text-violet-600'>DreamVault.</span></p>
    <p className='text-6xl text-white mb-16'>당신의 꿈을 열어보세요.</p>
    <div className='flex LogInBtns justify-center items-center border-4 mb-4 p-2 w-1/5 border-purple-800 text-white rounded-xl hover-bg-'>
      <Image src={googlelogo} alt='구글로고' width={30} height={30} className='rounded-full'/>
      <button onClick={handleLogin} className='text-xl ml-10'>구글로 로그인</button>
    </div>
    <div className='flex justify-center items-center border-4 border-purple-800 text-white mb-4 p-2 w-1/5 rounded-xl hover-bg-gradient-LoginBtn'>
    <Image src={kakaologo} alt='카카오톡로고' width={30} height={30} className='rounded-full'/>
    <button onClick={handleLogin} className='text-xl ml-10'>카카오톡으로 로그인</button>
  </div>
  <div className='flex justify-center items-center border-4 border-purple-800 text-white mb-4 p-2 w-1/5 rounded-xl hover-bg-gradient-LoginBtn'>
  <Image src={naverlogo} alt='네이버로고' width={30} height={30} className='rounded-full' />
  <button onClick={handleLogin} className='text-xl ml-10'>네이버로 로그인</button>
</div>
</div>
</>
  );
};

export default LogIn;
