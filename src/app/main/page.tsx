/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Cookies } from 'react-cookie';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function MainPage() {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 500);

    return () => clearTimeout(timer); // cleanup the timeout on component unmount
  }, []);

  return <div>잘못된 접근입니다</div>;
}

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPage />
    </Suspense>
  );
}
