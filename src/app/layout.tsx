/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { MSWComponent } from './mocks/MSWComponent';
import MusicBar from './components/Musicbar/Musicbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DreamVault',
  description: 'Generated by 별이 빛나는 밤',
  icons: {
    icon: '/DreamVaultLogoBGO.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <link
          rel="icon"
          href="https://i.ibb.co/1GnSm8z/Dream-Vault-Png.png"
          sizes="any"
        />
        <MSWComponent>{children}</MSWComponent>
        <MusicBar />
      </body>
    </html>
  );
}
