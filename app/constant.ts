/*
 * :file description: 
 * :name: /chatgpt/app/constant.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-11 05:21:09
 * :last editor: 张德志
 * :date last edited: 2023-08-26 22:39:49
 */
export const OWNER = "Yidadaa";
export const REPO = "ChatGPT-Next-Web";
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
export const ISSUE_URL = `https://github.com/${OWNER}/${REPO}/issues`;
export const UPDATE_URL = `${REPO_URL}#keep-updated`;
export const RELEASE_URL = `${REPO_URL}/releases`;
export const FETCH_COMMIT_URL = `https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=1`;
export const FETCH_TAG_URL = `https://api.github.com/repos/${OWNER}/${REPO}/tags?per_page=1`;
export const RUNTIME_CONFIG_DOM = "danger-runtime-config";
export const DEFAULT_API_HOST = "https://chatgpt1.nextweb.fun/api/proxy";

export enum Path {
  Home = "/",
  Chat = "/chat",
  Settings = "/settings",
  NewChat = "/new-chat",
  Masks = "/masks",
  Auth = "/login",
  Login = '/login',
  Number = '/number',
  Knowledge = '/knowledge'
}

export enum SlotID {
  AppBody = "app-body",
}

export enum UserAuthTypeEnum {
  register = 'register',
  findPassword = 'findPassword'
}

export enum TableEnum {
  "bill" = "bill",
  "pay" = "pay",
  "promotion" = "promotion",
  "inform" = "inform",
}

export enum OpenAiChatEnum {
  'GPT35' = 'gpt-3.5-turbo',
  'GPT3516k' = 'gpt-3.5-turbo-16k',
  'GPT4' = 'gpt-4',
  'GPT432k' = 'gpt-4-32k'
}

export const ChatModelMap = {
  [OpenAiChatEnum.GPT35]: {
    chatModel: OpenAiChatEnum.GPT35,
    name: 'Gpt35-4k',
    contextMaxToken: 4000,
    systemMaxToken: 2400,
    maxTemperature: 1.2,
    price: 1.5
  },
  [OpenAiChatEnum.GPT3516k]: {
    chatModel: OpenAiChatEnum.GPT3516k,
    name: 'Gpt35-16k',
    contextMaxToken: 16000,
    systemMaxToken: 8000,
    maxTemperature: 1.2,
    price: 3
  },
  [OpenAiChatEnum.GPT4]: {
    chatModel: OpenAiChatEnum.GPT4,
    name: 'Gpt4',
    contextMaxToken: 8000,
    systemMaxToken: 4000,
    maxTemperature: 1.2,
    price: 45
  },
  [OpenAiChatEnum.GPT432k]: {
    chatModel: OpenAiChatEnum.GPT432k,
    name: 'Gpt4-32k',
    contextMaxToken: 32000,
    systemMaxToken: 8000,
    maxTemperature: 1.2,
    price: 90
  }
};

export const chatModelList: any[] = [
  ChatModelMap[OpenAiChatEnum.GPT3516k],
  ChatModelMap[OpenAiChatEnum.GPT35],
  ChatModelMap[OpenAiChatEnum.GPT4]
];




export enum TrainingModeEnum {
  'qa' = 'qa',
  'index' = 'index'
}
export const TrainingTypeMap = {
  [TrainingModeEnum.qa]: 'qa',
  [TrainingModeEnum.index]: 'index'
};


export enum BillTypeEnum {
  chat = 'chat',
  openapiChat = 'openapiChat',
  QA = 'QA',
  vector = 'vector',
  return = 'return'
}

export enum InformTypeEnum {
  system = 'system'
}

export const BillTypeMap: Record<`${BillTypeEnum}`, string> = {
  [BillTypeEnum.chat]: '对话',
  [BillTypeEnum.openapiChat]: 'api 对话',
  [BillTypeEnum.QA]: 'QA拆分',
  [BillTypeEnum.vector]: '索引生成',
  [BillTypeEnum.return]: '退款'
};

export enum PromotionEnum {
  invite = 'invite',
  shareModel = 'shareModel',
  withdraw = 'withdraw'
}

export const PromotionTypeMap = {
  [PromotionEnum.invite]: '好友充值',
  [PromotionEnum.shareModel]: '应用分享',
  [PromotionEnum.withdraw]: '提现'
};


export enum FileName {
  Masks = "masks.json",
  Prompts = "prompts.json",
}

export enum StoreKey {
  Chat = "chat-next-web-store",
  Access = "access-control",
  Config = "app-config",
  Mask = "mask-store",
  Prompt = "prompt-store",
  Update = "chat-update",
  Sync = "sync",
}

export enum PageTypeEnum {
  login = 'login',
  register = 'register',
  forgetPassword = 'forgetPassword'
}

export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 230;
export const NARROW_SIDEBAR_WIDTH = 100;

export const PRICE_SCALE = 100000;

export const embeddingPrice = 0.1;


export const ACCESS_CODE_PREFIX = "ak-";

export const LAST_INPUT_KEY = "last-input";

export const REQUEST_TIMEOUT_MS = 60000;

export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown";

export const OpenaiPath = {
  ChatPath: "chat/completions",
  UsagePath: "dashboard/billing/usage",
  SubsPath: "dashboard/billing/subscription",
  ListModelPath: "v1/models",
};


export const TOKEN_ERROR_CODE: Record<number, string> = {
  403: '登录状态无效,请重新登录'
};



export const DEFAULT_INPUT_TEMPLATE = `{{input}}`; // input / time / model / lang
export const DEFAULT_SYSTEM_TEMPLATE = `
You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: 2021-09
Current model: {{model}}
Current time: {{time}}`;

export const DEFAULT_MODELS = [
  {
    name: "gpt-4",
    available: true,
  },
  {
    name: "gpt-4-0314",
    available: true,
  },
  {
    name: "gpt-4-0613",
    available: true,
  },
  {
    name: "gpt-4-32k",
    available: true,
  },
  {
    name: "gpt-4-32k-0314",
    available: true,
  },
  {
    name: "gpt-4-32k-0613",
    available: true,
  },
  {
    name: "gpt-3.5-turbo",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-0301",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-0613",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-16k",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-16k-0613",
    available: true,
  },
] as const;

export const CHAT_PAGE_SIZE = 15;
export const MAX_RENDER_MSG_COUNT = 45;
