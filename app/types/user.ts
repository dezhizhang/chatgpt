/*
 * :file description:
 * :name: /chatgpt/app/types/user.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 19:58:25
 * :last editor: 张德志
 * :date last edited: 2023-08-13 20:00:24
 */

export interface UserType {
  _id: string;
  username: string;
  avatar: string;
  openaiKey: string;
  balance: number;
  promotion: {
    rate: number;
  };
}

export interface UserUpdateParams {
  balance?: number;
  avatar?: string;
  openaiKey?: string;
}

export interface UserBillType {
  id: string;
  time: Date;
  modelName: string;
  type: string;
  textLen: number;
  tokenLen: number;
  price: number;
}
