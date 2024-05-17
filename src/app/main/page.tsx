/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Cookies } from 'react-cookie';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 메인 페이지 컴포넌트
function page() {
  const cookies = new Cookies();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  useEffect(() => {
    setAccessToken(searchParams.get('accessToken') || '');
    setRefreshToken(searchParams.get('refreshToken') || '');
    if (accessToken !== '' && refreshToken !== '') {
      cookies.set('accessToken', accessToken, { path: '/' });
      cookies.set('refreshToken', refreshToken, { path: '/' });
      router.push('/home');
    }
  }, [accessToken, refreshToken]);

  setTimeout(() => {
    router.push('/home');
  }, 500);

  return (
    <div className="flex h-full w-full flex-col items-end justify-end">
      잘못된 접근입니다
    </div>
  );
}

export default page;
