/*
 * :file description: 
 * :name: /chatgpt/app/store/access.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-11 05:21:09
 * :last editor: 张德志
 * :date last edited: 2023-08-19 17:22:44
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_API_HOST, StoreKey,TOKEN_ERROR_CODE } from "../constant";
import { getHeaders } from "../client/api";
import { getClientConfig } from "../config/client";

export interface AccessControlStore {
  balance: number;
  username: string;
  accessCode: string;
  token: string;
  avatar:string,
  needCode: boolean;
  hideUserApiKey: boolean;
  hideBalanceQuery: boolean;
  disableGPT4: boolean;

  openaiUrl: string;

  updateToken: (_: string) => void;
  updateCode: (_: string) => void;
  updateOpenAiUrl: (_: string) => void;
  enabledAccessControl: () => boolean;
  isAuthorized: () => boolean;
  fetch: () => void;
}

let fetchState = 0; // 0 not fetch, 1 fetching, 2 done

const DEFAULT_OPENAI_URL =
  getClientConfig()?.buildMode === "export" ? DEFAULT_API_HOST : "/api/openapi/";
console.log("[API] default openai url", DEFAULT_OPENAI_URL);

export const useAccessStore = create<AccessControlStore>()(
  persist(
    (set, get) => ({
      token: "",
      accessCode: "",
      avatar:"",
      balance:0,
      createTime:0,
      username:'',
      needCode: true,
      hideUserApiKey: false,
      hideBalanceQuery: false,
      disableGPT4: false,

      openaiUrl: DEFAULT_OPENAI_URL,

      enabledAccessControl() {
        get().fetch();

        return get().needCode;
      },
     
      
      updateCode(code: string) {
        set(() => ({ accessCode: code?.trim() }));
      },
      updateToken(token: string) {
        set(() => ({ token: token?.trim() }));
      },
      updateOpenAiUrl(url: string) {
        set(() => ({ openaiUrl: url?.trim() }));
      },
      isAuthorized() {
        get().fetch();

        // has token or has code or disabled access control
        return (
          !!get().token || !!get().accessCode || !get().enabledAccessControl()
        );
      },
      fetch() {
        if (fetchState > 0 || getClientConfig()?.buildMode === "export") return;
        fetchState = 1;
        fetch("/api/user/tokenLogin", {
          method: "get",
          body: null,
          headers: {
            ...getHeaders(),
          },
        })
          .then((res) => res.json())
          .then((res) => {
            const data = res?.data;
            if(res?.code in TOKEN_ERROR_CODE) {
              window.location.replace(
                `/#/login`
              );
              return;
            }
            set(() => ({ ...data }));
          })
          .catch(() => {
            console.error("[Config] failed to fetch config");
          })
          .finally(() => {
            fetchState = 2;
          });
      },
    }),
    {
      name: StoreKey.Access,
      version: 1,
    },
  ),
);
