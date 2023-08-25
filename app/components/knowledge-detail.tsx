/*
 * :file description:
 * :name: /chatgpt/app/components/knowledge-detail.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-21 23:38:54
 * :last editor: 张德志
 * :date last edited: 2023-08-25 23:46:23
 */

import React, { useRef, useState, useEffect } from "react";
import { Tabs } from "./tabs";
import { theme } from "../theme";
import BotIcon from "../icons/bot.svg";
import LoadingIcon from "../icons/three-dots.svg";
import dynamic from "next/dynamic";
import { getKbById } from "../api/knowledge";
import { useForm } from "react-hook-form";
import type { KbItemType } from "../typing";
import { type ComponentRef } from "./base-info";
import BaseInfo from './base-info';
import styles from "./knowledge-list.module.scss";
import { Box, Flex, ChakraProvider } from "@chakra-ui/react";

enum TabEnum {
  data = "data",
  test = "test",
  info = "info",
}
export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

// const BaseInfo = dynamic(async () => (await import("./base-info")).BaseInfo, {
//   loading: () => <Loading noLogo />,
// });

const DataManagement = dynamic(
  async () => (await import("./data-management")).DataManagement,
  {
    loading: () => <Loading noLogo />,
  },
);

const ExploratoryTesting = dynamic(
  async () => (await import("./exploratory-testing")).ExploratoryTesting,
  {
    loading: () => <Loading noLogo />,
  },
);

export interface KbDetailProps {
  kbId: string;
}

export function KnowledgeDetail({ kbId }: KbDetailProps) {
  const [currentTab, setCurrentTab] = useState(TabEnum.data);
  const form = useForm<KbItemType>({
    defaultValues: {},
  });
  const basicInfo = useRef<ComponentRef>(null);
  const tabsList = useRef<any>([
    {
      label: "数据管理",
      id: TabEnum.data,
      Component: <DataManagement />,
    },
    {
      label: "搜索测试",
      id: TabEnum.test,
      Component: <ExploratoryTesting />,
    },
    {
      label: "基本信息",
      id: TabEnum.info,
      Component: (
        <BaseInfo
          kbId={kbId}
          form={form} //@ts-ignore
          ref={basicInfo}
          // onSuccess={() =>fetchKbById()}
        />
      ),
    },
  ]);

  const fetchKbById = async () => {
    const res = await getKbById(kbId);
    for (let key in res) {
      form.setValue(key as any, (res as any)[key]);
    }
  };

  useEffect(() => {
    fetchKbById();
  }, [kbId]);

  return (
    <ChakraProvider theme={theme}>
      <Flex
        flexDirection={"column"}
        bg={"#fcfcfc"}
        h={"100%"}
        pt={5}
        overflow={"overlay"}
        position={"relative"}
      >
        <Box mb={3}>
          <Tabs
            m={"auto"}
            w={"260px"}
            size={"md"}
            list={tabsList.current}
            activeId={currentTab}
            onChange={(e: any) => setCurrentTab(e)}
          />
        </Box>
        <Box flex={"1 0 0"} overflow={"overlay"}>
          {tabsList.current.map((item: { id: TabEnum; Component: any }) => {
            return item.id === currentTab ? item.Component : null;
          })}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
