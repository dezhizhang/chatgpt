/*
 * :file description:
 * :name: /chatgpt/app/components/base-info.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-22 05:00:39
 * :last editor: 张德志
 * :date last edited: 2023-08-22 05:26:51
 */
import React, {
  useCallback,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  IconButton,
  Tooltip,
  Input,
  Card,
} from "@chakra-ui/react";
import { Avatar } from "./emoji";
import BotIcon from "../icons/bot.svg";
import LoadingIcon from "../icons/three-dots.svg";
import dynamic from "next/dynamic";
import { KbItemType } from "../typing";
import styles from "./knowledge-list.module.scss";
import { UseFormReturn } from "react-hook-form";

import { QuestionOutlineIcon, DeleteIcon } from "@chakra-ui/icons";

export interface ComponentRef {
  initInput: (tags: string) => void;
}

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

const Tag = dynamic(async () => (await import("./tag")).Tag, {
  loading: () => <Loading noLogo />,
});

export function BaseInfo(
  { kbId, form }: { kbId: string; form: UseFormReturn<KbItemType, any> },
  ref: ForwardedRef<ComponentRef>,
) {
  const { getValues, formState, setValue, register, handleSubmit } = form;
  const InputRef = useRef<HTMLInputElement>(null);

  const saveSubmitSuccess = useCallback(
    async (data: KbItemType) => {
    //   setBtnLoading(true);
    //   try {
    //     await putKbById({
    //       id: kbId,
    //       ...data
    //     });
    //     await getKbDetail(kbId, true);
    //     toast({
    //       title: '更新成功',
    //       status: 'success'
    //     });
    //     loadKbList(true);
    //   } catch (err: any) {
    //     toast({
    //       title: err?.message || '更新失败',
    //       status: 'error'
    //     });
    //   }
    //   setBtnLoading(false);
    },
    // [getKbDetail, kbId, loadKbList, toast],
    []
  );
  const saveSubmitError = useCallback(() => {
    // deep search message
    const deepSearch = (obj: any): string => {
      if (!obj) return '提交表单错误';
      if (!!obj.message) {
        return obj.message;
      }
      return deepSearch(Object.values(obj)[0]);
    };
    // toast({
    //   title: deepSearch(formState.errors),
    //   status: 'error',
    //   duration: 4000,
    //   isClosable: true
    // });
  }, [formState.errors]);

  return (
    <Flex px={5} flexDirection={"column"} alignItems={"center"}>
      <Flex mt={5} w={"100%"} maxW={"350px"} alignItems={"center"}>
        <Box flex={"0 0 90px"} w={0}>
          知识库头像
        </Box>
        <Box flex={1}>
          <Avatar avatar={getValues("avatar")} />
        </Box>
      </Flex>
      <FormControl
        mt={8}
        w={"100%"}
        maxW={"350px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Box flex={"0 0 90px"} w={0}>
          知识库名称
        </Box>
        <Input
          flex={1}
          {...register("name", {
            required: "知识库名称不能为空",
          })}
        />
      </FormControl>
      <Flex
        mt={8}
        alignItems={"center"}
        w={"100%"}
        maxW={"350px"}
        flexWrap={"wrap"}
      >
        <Box flex={"0 0 90px"} w={0}>
          分类标签
          <Tooltip label={"用空格隔开多个标签，便于搜索"}>
            <QuestionOutlineIcon ml={1} />
          </Tooltip>
        </Box>
        <Input
          flex={1}
          maxW={"300px"}
          ref={InputRef}
          placeholder={"标签,使用空格分割。"}
          maxLength={30}
          onChange={(e) => {
            setValue("tags", e.target.value);
            // setRefresh(!refresh);
          }}
        />
        <Box pl={"90px"} mt={2} w="100%">
          {getValues("tags") ? (
            <>
              {getValues("tags")
                .split(" ")
                .filter((item) => item)
                .map((item, i) => (
                  <Tag mr={2} mb={2} key={i} whiteSpace={"nowrap"}>
                    {item}
                  </Tag>
                ))}
            </>
          ) : null}
        </Box>
      </Flex>
      <Flex mt={5} w={"100%"} maxW={"350px"} alignItems={"flex-end"}>
        <Box flex={"0 0 90px"} w={0}></Box>
        <Button
          // isLoading={btnLoading}
          mr={4}
          w={"100px"}
          onClick={handleSubmit(saveSubmitSuccess, saveSubmitError)}
        >
          保存
        </Button>
        <IconButton
          // isLoading={btnLoading}
          icon={<DeleteIcon />}
          aria-label={""}
          variant={"outline"}
          size={"sm"}
          _hover={{
            color: "red.600",
            borderColor: "red.600",
          }}
        //   onClick={openConfirm(onclickDelKb)}
        />
      </Flex>
      {/* <File onSelect={onSelectFile} /> */}
      {/* <ConfirmChild /> */}
    </Flex>
  );
}
