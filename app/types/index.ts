/*
 * :file description: 
 * :name: /chatgpt/app/types/index.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 20:01:15
 * :last editor: 张德志
 * :date last edited: 2023-08-13 20:01:15
 */


export type PagingData<T> = {
  pageNum: number;
  pageSize: number;
  data: T[];
  total?: number;
};

export type RequestPaging = { pageNum: number; pageSize: number; };

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
