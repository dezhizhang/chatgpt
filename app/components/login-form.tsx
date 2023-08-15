/*
 * :file description:
 * :name: /chatgpt/app/components/login-form.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 13:59:27
 * :last editor: 张德志
 * :date last edited: 2023-08-16 04:16:33
 */
import React, { useState, Dispatch, useCallback, CSSProperties } from "react";
import {
  FormControl,
  Flex,
  Input,
  Button,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { Path } from "../constant";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postLogin } from '../api/user';
import { useToast } from '../hooks/useToast';
import { PageTypeEnum } from "../constant";
const inputStyle = { maxWidth: '100%', borderRadius: '4px', textAlign: 'left' }

export interface LoginProps {
  setPageType: Dispatch<`${PageTypeEnum}`>;
}

interface LoginFormType {
  username: string;
  password: string;
}

export function LoginForm({ setPageType }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [requesting, setRequesting] = useState(false);
  const onclickLogin = useCallback(
    async ({ username, password }: LoginFormType) => {
      setRequesting(true);
      try {
        const res = await  postLogin({
          username,
          password
        });
        const { user } = res;
        if(user?._id) {
          toast({
            title: '登录成功',
            status: 'success'
          });
          localStorage.setItem('user',JSON.stringify(user))
          setTimeout(() => {
            navigate(Path.Home)
          },500);
        }
      } catch (error: any) {
        toast({
          title: error.message || '登录异常',
          status: 'error'
        });
      }
      setRequesting(false);
    },
    []
  );
  return (
    <>
      <Box fontWeight={"bold"} fontSize={"2xl"} textAlign={"center"}>
        登录晓智GPT
      </Box>
      <form onSubmit={handleSubmit(onclickLogin)}>
        <FormControl mt={8} isInvalid={!!errors.username}>
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
            {!!errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>
        
        <FormControl mt={8} isInvalid={!!errors.password}>
          <Input
            type={"password"}
            style={inputStyle as CSSProperties}
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
            {!!errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Flex
          align={"center"}
          justifyContent={"space-between"}
          mt={6}
          color={"myBlue.600"}
        >
          <Box
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
            onClick={() => setPageType(PageTypeEnum.forgetPassword)}
            fontSize="sm"
          >
            忘记密码?
          </Box>
          <Box
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
            onClick={() => setPageType(PageTypeEnum.register)}
            fontSize="sm"
          >
            注册账号
          </Box>
        </Flex>
        <Button
          type="submit"
          mt={8}
          w={"100%"}
          size={["md", "lg"]}
          colorScheme="blue"
          isLoading={requesting}
        >
          登录
        </Button>
      </form>
    </>
  );
}
