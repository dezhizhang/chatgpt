/*
 * :file description:
 * :name: /chatgpt/app/components/register-form.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 16:12:11
 * :last editor: 张德志
 * :date last edited: 2023-08-13 17:03:52
 */
import React, { useState, Dispatch, useCallback, CSSProperties } from "react";
import { PageTypeEnum } from "../constant";
import { useForm } from "react-hook-form";
import {
  FormControl,
  Box,
  Input,
  Button,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";

interface Props {
  loginSuccess: (e: any) => void;
  setPageType: Dispatch<`${PageTypeEnum}`>;
}

const inputStyle = { maxWidth: '100%', borderRadius: '4px', textAlign: 'left' }

export interface RegisterProps {
  setPageType: Dispatch<`${PageTypeEnum}`>;
}

export function RegisterForm({ setPageType, loginSuccess }:RegisterProps) {

  const [requesting, setRequesting] = useState(false);
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
        注册晓智GPT账号
      </Box>
      <form onSubmit={() => {}}>
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
            {/* {!!errors.username && errors.username.message} */}
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
            {/* {!!errors.password && errors.password.message} */}
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
