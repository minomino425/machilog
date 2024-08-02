import Head from 'next/head';
import React from 'react';
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body className="bg-pattern">{children}</body>
    </html>
  )
}
