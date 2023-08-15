/*
 * :file description:
 * :name: /chatgpt/app/components/register-form.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 16:12:11
 * :last editor: 张德志
 * :date last edited: 2023-08-16 04:24:49
 */
import React, { useState, Dispatch, useCallback, CSSProperties } from "react";
import { PageTypeEnum } from "../constant";
import { postRegister } from '../api/user';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useToast } from '../hooks/useToast';
import { useSendCode } from '../hooks/useSendCode';
import {
  FormControl,
  Box,
  Input,
  Button,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";

const inputStyle = { maxWidth: '100%', borderRadius: '4px', textAlign: 'left' }

interface RegisterType {
  username: string;
  password: string;
  password2: string;
  code: string;
}

export interface RegisterProps {
  setPageType: Dispatch<`${PageTypeEnum}`>;
}

export function RegisterForm({ setPageType }: RegisterProps) {
  const [requesting, setRequesting] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors }
  } = useForm<any>({
    mode: "onBlur",
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { codeSending, sendCodeText, sendCode, codeCountDown } = useSendCode();
  const onclickSendCode = useCallback(async () => {
    const check = await trigger('username');
    if (!check) return;
    sendCode({
      username: getValues('username'),
      type: 'register'
    });
  }, [getValues, sendCode, trigger]);

  const onclickRegister = useCallback(
    async ({ username, password, code }: RegisterType) => {
      setRequesting(true);
      const res = await postRegister({
        username,
        code,
        password,
        inviterId: localStorage.getItem('inviterId') || ''
      });
      if (res.code === 200) {
        toast({
          title: `注册成功`,
          status: 'success'
        });
        setPageType(PageTypeEnum.login);
        return
      }
      toast({
        title: res.message || '注册异常',
        status: 'error'
      });
      setRequesting(false);
    },
    []
  );


  return (
    <>
      <Box fontWeight={"bold"} fontSize={"2xl"} textAlign={"center"}>
        注册晓智GPT账号
      </Box>
      <form onSubmit={handleSubmit(onclickRegister)}>
        <FormControl mt={5} isInvalid={!!errors.username}>
          <Input
            placeholder="邮箱/手机号"
            style={inputStyle as CSSProperties}
            {...register("username", {
              required: "邮箱/手机号不能为空",
              pattern: {
                value:
                  /(^1[3456789]\d{9}$)|(^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$)/,
                message: "邮箱/手机号格式错误",
              },
            })}
          ></Input>
          <FormErrorMessage position={"absolute"} fontSize="xs">
            {!!(errors as any).username && (errors as any).username.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={8} isInvalid={!!errors.username}>
          <Flex>
            <Input
              flex={1}

              placeholder="验证码"
              {...register("code", {
                required: "验证码不能为空",
              })}
            ></Input>
            <Button
              ml={5}
              w={"145px"}
              maxW={"50%"}

              onClick={onclickSendCode}
              isDisabled={codeCountDown > 0}
              isLoading={codeSending}
            >
              {sendCodeText}
            </Button>
          </Flex>
          <FormErrorMessage position={"absolute"} fontSize="xs">
            {!!(errors as any).code && (errors as any).code.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={8} isInvalid={!!errors.password}>
          <Input
            style={inputStyle as CSSProperties}
            type={"password"}
            placeholder="密码"
            {...register("password", {
              required: "密码不能为空",
              minLength: {
                value: 4,
                message: "密码最少4位最多12位",
              },
              maxLength: {
                value: 12,
                message: "密码最少4位最多12位",
              },
            })}
          ></Input>
          <FormErrorMessage position={"absolute"} fontSize="xs">
            {!!(errors as any).password && (errors as any).password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={8} isInvalid={!!errors.password2}>
          <Input
            style={inputStyle as CSSProperties}
            type={"password"}
            placeholder="确认密码"
            {...register("password2", {
              validate: (val) =>
                getValues("password") === val ? true : "两次密码不一致",
            })}
          ></Input>
          <FormErrorMessage position={"absolute"} fontSize="xs">
            {!!(errors as any).password2 && (errors as any).password2.message}
          </FormErrorMessage>
        </FormControl>
        <Box
          float={"right"}
          fontSize="sm"
          mt={2}
          color={"myBlue.600"}
          cursor={"pointer"}
          _hover={{ textDecoration: "underline" }}
          onClick={() => setPageType(PageTypeEnum.login)}
        >
          已有账号，去登录
        </Box>
        <Button
          type="submit"
          mt={5}
          w={"100%"}
          size={["md", "lg"]}
          colorScheme="blue"
          isLoading={requesting}
        >
          确认注册
        </Button>
      </form>
    </>
  );
}
