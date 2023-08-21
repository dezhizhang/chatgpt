/*
 * :file description:
 * :name: /chatgpt/app/components/knowledge-detail.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-21 23:38:54
 * :last editor: 张德志
 * :date last edited: 2023-08-22 04:52:45
 */

import React, { useRef, useState } from "react";
import { Tabs } from "./tabs";
import { theme } from "../theme";
import { Box, Flex, ChakraProvider } from "@chakra-ui/react";

enum TabEnum {
  data = "data",
  test = "test",
  info = "info",
}

export function KnowledgeDetail() {
  const [currentTab, setCurrentTab] = useState(TabEnum.data);
  const tabsList = useRef<any>([
    {
      label: "数据管理",
      id: TabEnum.data,
      Component: null,
    },
    {
      label: "搜索测试",
      id: TabEnum.test,
      Component: null,
    },
    {
      label: "基本信息",
      id: TabEnum.info,
      Component: null,
    },
  ]);
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
          {tabsList.current.map((item: { id: TabEnum; Component: any; }) => {
            return item.id === currentTab ? item.Component : null;
          })}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
