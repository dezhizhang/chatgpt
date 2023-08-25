/*
 * :file description:
 * :name: /chatgpt/app/api/chat.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 17:12:37
 * :last editor: 张德志
 * :date last edited: 2023-08-25 21:35:28
 */
import { GET, POST, PUT, DELETE } from "./request";

import type { ChatInitParams } from "../typing";
import type {ModelUpdateParams} from '../typing';

// 获取模型列表
export const getModelList = () => GET<any>("/model/list");

// 初始化模型
export const getChatInit = (params: ChatInitParams) =>
  GET<any>("/chat/init", params);

// 删除模型
export const deleteMode = (modelId:string) =>
  DELETE<any>(`/model/del?modelId=${modelId}`);

// 创建模型
export const createModel = (params:{name:string}) =>POST('/model/create',params);

/**
 * 根据 ID 获取模型
 */
export const getModelById = (id: string) => GET<any>(`/model/detail?modelId=${id}`);

/**
 * 根据 ID 更新模型
 */
export const putModelById = (id: string, data: any) =>
  PUT(`/model/update?modelId=${id}`, data);