/*
 * :file description: 
 * :name: /chatgpt/app/layout.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-11 05:21:09
 * :last editor: 张德志
 * :date last edited: 2023-08-27 15:27:06
 */
/* eslint-disable @next/next/no-page-custom-font */
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import Script from 'next/script'
import { getClientConfig } from "./config/client";
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: "千知GPT",
  description: "Your personal ChatGPT Chat Bot.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  appleWebApp: {
    title: "千知GPT",
    statusBarStyle: "default",
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="config" content={JSON.stringify(getClientConfig())} />
        <link rel="manifest" href="/site.webmanifest"></link>
        <Script src="/serviceWorkerRegister.js" defer></Script>
        <Script src="/pdf.js"></Script>
      </head>
      <body>
      {children}
      </body>
    </html>
  );
}
