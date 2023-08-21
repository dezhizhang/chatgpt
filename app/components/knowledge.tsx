/*
 * :file description:
 * :name: /chatgpt/app/components/knowledge.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-21 20:28:42
 * :last editor: 张德志
 * :date last edited: 2023-08-21 20:52:48
 */

import React, { useEffect } from "react";
import BotIcon from "../icons/bot.svg";
import LoadingIcon from "../icons/three-dots.svg";
import { Box, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import styles from "./knowledge.module.scss";

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

const FlexSideBar = dynamic(
  async () => (await import("./flexsidebar")).Flexsidebar,
  {
    loading: () => <Loading noLogo />,
  },
);

export function Knowledge() {
  const kbId = "";
  return (
    <Flex h={"100%"} position={"relative"} overflow={"hidden"}>
      {/* 模型列表 */}
      {!kbId && (
        <FlexSideBar w={["100%", "0 0 250px", "0 0 270px", "0 0 290px"]}>
          2222
          {/* <KbList kbId={kbId} /> */}
        </FlexSideBar>
      )}
      {!!kbId && (
        <Box flex={"1 0 0"} w={0} h={"100%"} position={"relative"}>
          1111
          {/* <KbDetail kbId={kbId} /> */}
        </Box>
      )}
    </Flex>
  );
}
