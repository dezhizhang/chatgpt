/*
 * :file description: 
 * :name: /chatgpt/app/typing.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-11 05:21:09
 * :last editor: 张德志
 * :date last edited: 2023-08-20 15:29:30
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
  modelId:string,
  chatId?:string
}

export interface ChatMessagesParams {
  content:string;
  role:string;
  _id?:string;

}


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
  appId:string;
  chatId:string;
  messages:ChatMessagesParams[];
  model:string;
  stream:boolean;
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
  
  export type RequestPaging = { pageNum: number; pageSize: number; dateStart: any, dateEnd:any };
  
  declare global {
    var mongodb:  string | null;
    var pgClient:  null;
    var httpsAgent: string;
    var particlesJS: any;
    var grecaptcha: any;
    var QRCode: any;
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

export interface UserBillType {
    id: string;
    time: Date;
    modelName: string;
    type: string;
    textLen: number;
    tokenLen: number;
    price: number;
}

