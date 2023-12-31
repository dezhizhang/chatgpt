/*
 * :file description: 
 * :name: /chatgpt/app/utils/index.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 19:48:09
 * :last editor: 张德志
 * :date last edited: 2023-08-23 23:18:31
 */
import dayjs from 'dayjs';
import { useToast } from '../hooks/useToast'
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import { loginOut } from '../api/user';
import { PRICE_SCALE } from '../constant';

/**
 * copy text data
 */
export const useCopyData = () => {
  const { toast } = useToast();
  return {
    copyData: async (data: string, title: string = '复制成功') => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(data);
        } else {
          throw new Error('');
        }
      } catch (error) {
        const textarea = document.createElement('textarea');
        textarea.value = data;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      toast({
        title,
        status: 'success',
        duration: 1000
      });
    }
  };
};

export const clearCookie = () => {
  try {
    loginOut();
  } catch (error) {
    error;
  }
}

/**
 * file download
 */
export const fileDownload = ({
  text,
  type,
  filename
}: {
  text: string;
  type: string;
  filename: string;
}) => {
  // 导出为文件
  const blob = new Blob([`\uFEFF${text}`], { type: `${type};charset=utf-8;` });

  // 创建下载链接
  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.download = filename;

  // 添加链接到页面并触发下载
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};



/**
 * 密码加密
 */
export const createHashPassword = (text: string) => {
  const hash = sha256(text);
  return Base64.stringify(hash);
};

/**
 * 对象转成 query 字符串
 */
export const Obj2Query = (obj: Record<string, string | number>) => {
  const queryParams = new URLSearchParams();
  for (const key in obj) {
    queryParams.append(key, `${obj[key]}`);
  }
  return queryParams.toString();
};

/**
 * 格式化时间成聊天格式
 */
export const formatTimeToChatTime = (time: Date) => {
  const now = dayjs();
  const target = dayjs(time);

  // 如果传入时间小于60秒，返回刚刚
  if (now.diff(target, 'second') < 60) {
    return '刚刚';
  }

  // 如果时间是今天，展示几时:几秒
  if (now.isSame(target, 'day')) {
    return target.format('HH:mm');
  }

  // 如果是昨天，展示昨天
  if (now.subtract(1, 'day').isSame(target, 'day')) {
    return '昨天';
  }

  // 如果是前天，展示前天
  if (now.subtract(2, 'day').isSame(target, 'day')) {
    return '前天';
  }

  // 如果是今年，展示某月某日
  if (now.isSame(target, 'year')) {
    return target.format('M月D日');
  }

  // 如果是更久之前，展示某年某月某日
  return target.format('YYYY/M/D');
};

export const hasVoiceApi = typeof window !== 'undefined' && 'speechSynthesis' in window;
/**
 * voice broadcast
 */
export const voiceBroadcast = ({ text }: { text: string }) => {
  window.speechSynthesis?.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis?.getVoices?.(); // 获取语言包
  const voice = voices.find((item) => {
    return item.name === 'Microsoft Yaoyao - Chinese (Simplified, PRC)';
  });
  if (voice) {
    msg.voice = voice;
  }

  window.speechSynthesis?.speak(msg);

  msg.onerror = (e) => {
    console.log(e);
  };

  return {
    cancel: () => window.speechSynthesis?.cancel()
  };
};

export const getErrText = (err: any, def = '') => {
  const msg: string = typeof err === 'string' ? err : err?.message || def || '';
  msg && console.log('error =>', msg);
  return msg;
};

export const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });

/**
* 把数据库读取到的price，转化成元
*/
export const formatPrice = (val = 0, multiple = 1) => {
  return Number(((val / PRICE_SCALE) * multiple).toFixed(10));
};

