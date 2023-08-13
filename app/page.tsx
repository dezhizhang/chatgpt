/*
 * :file description:
 * :name: /chatgpt/app/page.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-11 05:21:09
 * :last editor: 张德志
 * :date last edited: 2023-08-13 15:28:27
 */
require("./polyfill");

import { Analytics } from "@vercel/analytics/react";
import { Home } from "./components/home";
import { getServerSideConfig } from "./config/server";
const serverConfig = getServerSideConfig();

export default async function App() {
  return (
    <>
      <Home/>
      {serverConfig?.isVercel && <Analytics />}
    </>
  );
}
