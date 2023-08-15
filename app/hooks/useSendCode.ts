/*
 * :file description: 
 * :name: /chatgpt/app/hooks/useSendCode.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 21:23:04
 * :last editor: 张德志
 * :date last edited: 2023-08-15 23:41:36
 */
import { useState, useMemo, useCallback } from 'react';
import { sendAuthCode } from '../api/user';
import { UserAuthTypeEnum } from '../constant';
import { useToast } from './useToast';
import { getClientToken } from '../utils/google';
import { useGlobalStore } from '../store/global';

let timer: any;

export const useSendCode = () => {

  const { toast } = useToast();
  const [codeSending, setCodeSending] = useState(false);
  const [codeCountDown, setCodeCountDown] = useState(0);
  const sendCodeText = useMemo(() => {
    if (codeCountDown >= 10) {
      return `${codeCountDown}s后重新获取`;
    }
    if (codeCountDown > 0) {
      return `0${codeCountDown}s后重新获取`;
    }
    return '获取验证码';
  }, [codeCountDown]);

  const sendCode = useCallback(
    async ({ username, type }: { username: string; type: `${UserAuthTypeEnum}` }) => {
      setCodeSending(true);
      try {
        await sendAuthCode({
          username,
          type,
          googleToken: await getClientToken('123')
        });
        setCodeCountDown(60);
        timer = setInterval(() => {
          setCodeCountDown((val) => {
            if (val <= 0) {
              clearInterval(timer);
            }
            return val - 1;
          });
        }, 1000);
        toast({
          title: '验证码已发送',
          status: 'success',
          position: 'top'
        });
      } catch (error: any) {
        toast({
          title: error.message || '发送验证码异常',
          status: 'error'
        });
      }
      setCodeSending(false);
    },
    [toast]
  );

  return {
    codeSending,
    sendCode,
    sendCodeText,
    codeCountDown
  };
};
