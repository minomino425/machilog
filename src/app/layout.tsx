import React from 'react';
import './globals.css';
import { Noto_Sans_JP } from 'next/font/google';
import ogImage from '../../public/og-image.png';

const NotoSansJPFont = Noto_Sans_JP({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={NotoSansJPFont.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="町田在住酒好きエンジニアによる外食備忘録🍺"
        />
        <meta
          property="og:title"
          content="🌈マチログ | 町田在住酒好きエンジニアによる外食備忘録🍺"
        />
        <meta
          property="og:description"
          content="町田在住酒好きエンジニアによる外食備忘録🍺"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://machilog.vercel.app/" />
        <meta property="og:image" content={ogImage.src} />
        <meta
          property="og:site_name"
          content="🌈マチログ | 町田在住酒好きエンジニアによる外食備忘録🍺"
        />
        <meta property="og:locale" content="ja_JP" />
        <title>🌈マチログ | 町田在住酒好きエンジニアによる外食備忘録🍺</title>
      </head>
      <body className="font-noto-sans-jp bg-pattern">{children}</body>
    </html>
  );
}
