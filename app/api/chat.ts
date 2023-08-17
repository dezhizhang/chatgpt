/*
 * :file description: 
 * :name: /chatgpt/app/api/chat.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 17:12:37
 * :last editor: 张德志
 * :date last edited: 2023-08-17 20:28:13
 */
import { GET, POST, PUT } from './request';
import type { ChatInitParams,ChatCompletionsParams } from '../typing';

const streamHeaders = {'Content-Type':'text/event-stream;charset=utf-8'}

// 获取模型列表
export const getModelList = () => GET<any>('/model/list');

// 初始化模型
export const getChatInit = (params: ChatInitParams) => GET<any>('/chat/init', params);

// 发起聊天
export const postChatCompletions = (params:ChatCompletionsParams) => POST<any>('/openapi/v1/chat/completions',params,{headers:streamHeaders});


