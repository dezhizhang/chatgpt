/*
 * :file description: 
 * :name: /chatgpt/app/api/chat.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-16 23:19:10
 * :last editor: 张德志
 * :date last edited: 2023-08-16 23:20:36
 */
/*
 * :file description: 
 * :name: /chatgpt/app/api/user.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 17:12:37
 * :last editor: 张德志
 * :date last edited: 2023-08-16 23:15:25
 */
import { GET, POST, PUT } from './request';

// 获取模型列表
export const getModelList = () => GET<any>('/model/list');
