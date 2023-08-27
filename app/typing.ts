/*
 * :file description: 
 * :name: /chatgpt/app/typing.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-11 05:21:09
 * :last editor: 张德志
 * :date last edited: 2023-08-27 13:57:59
 */
export type Updater<T> = (updater: (value: T) => void) => void;

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
export interface ResLogin {
  user: UserType;
}

export interface UserUpdateParams {
  balance?: number;
  avatar?: string;
  openaiKey?: string;
}

//模型初始化参数
export interface ChatInitParams {
  modelId: string,
  chatId?: string
}

export interface ChatMessagesParams {
  content: string;
  role: string;
  _id?: string;

}

export type FormData = { dataId?: string; a: string; q: string };



export interface ModelUpdateParams {
  name?: string;
  avatar?: string;
  intro?: string;
  chat?: any;
  share?: any;
}



export type ChatModelItemType = {
  chatModel: string;
  name: string;
  contextMaxToken: number;
  systemMaxToken: number;
  maxTemperature: number;
  price: number;
};
export interface KbItemType {
  avatar: string;
  name: string;
  updateTime: string;
  userId: string;
  _id: string;
  totalData: number;
  tags: string;
}


export type PushProps = {
  kbId: string;
  data: any[];
  mode: any;
  prompt?: string;
};

export type KbUpdateParams = {
  id: string;
  name: string;
  tags: string;
  avatar: string;
};

export type KbTestItemType = {
  id: string;
  kbId: string;
  text: string;
  time: Date;
  results: (any & { score: number })[];
};



export interface StreamFetchProps {
  data: any;
  onMessage: (text: string) => void;
  abortSignal: AbortController;
}

export type ChatResponseType = {
  newChatId: string;
  quoteLen?: number;
};

// 聊天记录
export interface ChatCompletionsParams {
  appId: string;
  chatId: string;
  messages: ChatMessagesParams[];
  model: string;
  stream: boolean;
}

export interface UserBillType {
  _id: string;
  time: Date;
  modelName: string;
  type: string;
  textLen: number;
  tokenLen: number;
  price: number;
}

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

export type PagingData<T> = {
  pageNum: number;
  pageSize: number;
  data: T[];
  total?: number;
};

export type RequestPaging = { pageNum: number; pageSize: number; dateStart?: any, dateEnd?: any };

declare global {
  var mongodb: string | null;
  var pgClient: null;
  var httpsAgent: string;
  var particlesJS: any;
  var grecaptcha: any;
  var qaQueueLen: number;
  var vectorQueueLen: number;
  var OpenAiEncMap: Record<string, any>;
  var systemEnv: {
    vectorMaxProcess: number;
    qaMaxProcess: number;
    pgIvfflatProbe: number;
    sensitiveCheck: boolean;
  };

  interface Window {
    ['pdfjs-dist/build/pdf']: any;
  }
}


export interface UserUpdateParams {
  balance?: number;
  avatar?: string;
  openaiKey?: string;
}

export interface UserPayType {
  _id: string;
  userId: string;
  createTime: Date;
  price: number;
  orderId: string;
  status: 'SUCCESS' | 'REFUND' | 'NOTPAY' | 'CLOSED';
}


export interface UserromotionType {
  _id: string;
  type: string;
  createTime: string;
  amount: number;
}


export interface UserinformType {
  _id: string;
  userId: string;
  time: Date;
  type: string;
  title: string;
  content: string;
  read: boolean;
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

