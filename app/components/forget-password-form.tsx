/*
 * :file description:
 * :name: /chatgpt/app/components/forget-password-form.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 16:32:53
 * :last editor: 张德志
 * :date last edited: 2023-08-13 16:53:32
 */

import React, { useState, Dispatch, useCallback, CSSProperties } from "react";
import {
  FormControl,
  Box,
  Input,
  Button,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import { PageTypeEnum } from "../constant";
import { useForm } from "react-hook-form";

const inputStyle = { maxWidth: '100%', borderRadius: '4px', textAlign: 'left' }

interface ForgetProps {
  setPageType: Dispatch<`${PageTypeEnum}`>;
  loginSuccess: (e: any) => void;
}

export function ForgetPasswordForm({ setPageType }: ForgetProps) {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<any>({
    mode: "onBlur",
  });
  return (
    <>
      <Box fontWeight={"bold"} fontSize={"2xl"} textAlign={"center"}>
        找回晓智GPT账号
      </Box>
      <form

      // onSubmit={handleSubmit(onclickFindPassword)}
      >
        <FormControl
          mt={5}

        //   isInvalid={!!errors.username}
        >
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
            {/* {!!errors.username && errors.username.message} */}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          mt={8}
        //   isInvalid={!!errors.username}
        >
          <Flex>
            <Input
              flex={1}
              style={inputStyle as CSSProperties}
              placeholder="验证码"
              {...register("code", {
                required: "验证码不能为空",
              })}
            ></Input>
            <Button
              ml={5}
              w={"145px"}
              maxW={"50%"}
            //   onClick={onclickSendCode}
            //   isDisabled={codeCountDown > 0}
            //   isLoading={codeSending}
            >
              {/* {sendCodeText} */}
            </Button>
          </Flex>
          <FormErrorMessage position={"absolute"} fontSize="xs">
            {/* {!!errors.code && errors.code.message} */}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={8} isInvalid={!!errors.password}>
          <Input
            type={"password"}
            placeholder="新密码"
            style={inputStyle as CSSProperties}
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
            {/* {!!errors.password && errors.password.message} */}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={8} isInvalid={!!errors.password2}>
          <Input
            type={"password"}
            placeholder="确认密码"
            style={inputStyle as CSSProperties}
            {...register("password2", {
              validate: (val) =>
                getValues("password") === val ? true : "两次密码不一致",
            })}
          ></Input>
          <FormErrorMessage position={"absolute"} fontSize="xs">
            {/* {!!errors.password2 && errors.password2.message} */}
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
          去登录
        </Box>
        <Button
          type="submit"
          mt={5}
          w={"100%"}
          size={["md", "lg"]}
          colorScheme="blue"
        //   isLoading={requesting}
        >
          找回密码
        </Button>
      </form>
    </>
  );
}