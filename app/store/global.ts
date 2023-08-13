/*
 * :file description: 
 * :name: /chatgpt/app/store/global.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 21:29:22
 * :last editor: 张德志
 * :date last edited: 2023-08-13 23:53:15
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist } from "zustand/middleware";
import { getInitData } from '../api/user';

type State = {
  initData: any;
  loadInitData: () => Promise<void>;
  loading: boolean;
  setLoading: (val: boolean) => null;
  screenWidth: number;
  setScreenWidth: (val: number) => void;
  isPc: boolean;
};

export const useGlobalStore = () =>{
  return {}
}
