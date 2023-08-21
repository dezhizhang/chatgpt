/*
 * :file description:
 * :name: /chatgpt/app/api/chat.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 17:12:37
 * :last editor: 张德志
 * :date last edited: 2023-08-22 06:27:09
 */
import { GET, POST, PUT, DELETE } from "./request";

import type { ChatInitParams } from "../typing";

// 获取模型列表
export const getModelList = () => GET<any>("/model/list");

// 初始化模型
export const getChatInit = (params: ChatInitParams) =>
  GET<any>("/chat/init", params);

// 删除模型
export const deleteMode = (modelId:string) =>
  DELETE<any>(`/model/del?modelId=${modelId}`);
