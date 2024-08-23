import React from 'react';
import './globals.css';
import { Noto_Sans_JP } from 'next/font/google';

const NotoSansJPFont = Noto_Sans_JP({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={NotoSansJPFont.className}>
      <head />
      <body className="font-noto-sans-jp bg-pattern">{children}</body>
    </html>
  );
}
