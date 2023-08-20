/*
 * :file description: 
 * :name: /chatgpt/app/api/user.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 17:12:37
 * :last editor: 张德志
 * :date last edited: 2023-08-20 14:24:52
 */
import { GET, POST, PUT } from './request';
import { createHashPassword, Obj2Query } from '../utils/index';
import { UserAuthTypeEnum } from '../constant';
import { UserBillType, UserUpdateParams,PagingData, RequestPaging } from '../typing';

export const sendAuthCode = (data: {
  username: string;
  type: `${UserAuthTypeEnum}`;
  googleToken: string;
}) => POST('/user/sendAuthCode', data);

export const getTokenLogin = () => GET<any>('/user/tokenLogin');

/* get promotion init data */
export const getPromotionInitData = () =>
  GET<{
    invitedAmount: number;
    historyAmount: number;
    residueAmount: number;
  }>('/user/promotion/getPromotionData');

export const postRegister = ({
  username,
  password,
  code,
  inviterId
}: {
  username: string;
  code: string;
  password: string;
  inviterId: string;
}) =>
  POST<any>('/user/register', {
    username,
    code,
    inviterId,
    password: createHashPassword(password)
  });

export const postFindPassword = ({
  username,
  code,
  password
}: {
  username: string;
  code: string;
  password: string;
}) =>
  POST<any>('/user/updatePasswordByCode', {
    username,
    code,
    password: createHashPassword(password)
  });

export const postLogin = ({ username, password }: { username: string; password: string }) =>
  POST<any>('/user/loginByPassword', {
    username,
    password: createHashPassword(password)
  });

export const loginOut = () => GET('/user/loginout');

export const putUserInfo = (data: UserUpdateParams) => PUT('/user/update', data);

export const getUserBills = (data: RequestPaging) =>
  POST<PagingData<UserBillType>>(`/user/getBill`, data);

export const getPayOrders = () => GET<any[]>(`/user/getPayOrders`);

export const getPayCode = (amount: number) =>
  GET<{
    codeUrl: string;
    payId: string;
  }>(`/user/getPayCode?amount=${amount}`);

export const checkPayResult = (payId: string) => GET<number>(`/user/checkPayResult?payId=${payId}`);

/* promotion records */
// export const getPromotionRecords = (data: RequestPaging) =>
//   GET<PromotionRecordType>(`/user/promotion/getPromotions?${Obj2Query(data)}`);

// export const getInforms = (data: RequestPaging) =>
//   POST<PagingData<informSchema>>(`/user/inform/list`, data);

export const getUnreadCount = () => GET<number>(`/user/inform/countUnread`);
export const readInform = (id: string) => GET(`/user/inform/read`, { id });


export const getInitData = () => GET<any>('/system/getInitData');

export const getSystemModelList = () => GET<any[]>('/system/getModels');



export const uploadImg = (base64Img: string) => POST<string>('/system/uploadImage', { base64Img });

