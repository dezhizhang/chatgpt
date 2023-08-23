/*
 * :file description:
 * :name: /chatgpt/app/store/knowledge.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-24 04:57:28
 * :last editor: 张德志
 * :date last edited: 2023-08-24 05:25:30
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type KbTestItemType } from "../typing";

type KnowledgeStore = {
  kbTestList: KbTestItemType[];
  pushKbTestItem: (data: KbTestItemType) => void;
  delKbTestItemById: (id: string) => void;
  updateKbItemById: (data: KbTestItemType) => void;
};

export const useKbStore = create<KnowledgeStore>()(
  persist(
    (set, get) => ({
      kbTestList: [],
      pushKbTestItem(data) {
        set((state) => {
          state.kbTestList = [data, ...state.kbTestList].slice(0, 500);
          return state;
        });
      },
      delKbTestItemById(id) {
        set((state) => {
          state.kbTestList = state.kbTestList.filter(
            (item: KbTestItemType) => item.id !== id,
          );
          return state;
        });
      },
      updateKbItemById(data: KbTestItemType) {
        set((state) => {
          state.kbTestList = state.kbTestList.map((item: KbTestItemType) =>
            item.id === data.id ? data : item,
          );
          return state;
        });
      },
    }),
    {
      name: "kbStore",
      partialize: (state) => ({
        kbTestList: state.kbTestList,
      }),
    },
  ),
);
