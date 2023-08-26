/*
 * :file description:
 * :name: /chatgpt/app/components/knowledge-list.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-21 21:55:51
 * :last editor: 张德志
 * :date last edited: 2023-08-26 22:46:49
 */
import qs from "qs";
import React, { useCallback, useState, useEffect,useMemo } from "react";
import {
  Box,
  Flex,
  Icon,
  Input,
  IconButton,
  Tooltip,
  ChakraProvider,
} from "@chakra-ui/react";
import { Avatar } from "./emoji";
import { theme } from "../theme";
import BotIcon from "../icons/bot.svg";
import { Path } from "../constant";
import { useToast } from "../hooks/useToast";
import LoadingIcon from "../icons/three-dots.svg";
import type { KbItemType } from "../typing";
import { getKbList, postCreateKb } from "../api/knowledge";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
import styles from "./knowledge-list.module.scss";

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

export function KnowledgeList() {
  const hash = location.hash;
  const urlParse: any = qs.parse(hash?.split("?")?.[1]);
  const { kbId } = urlParse || {};

  const { toast } = useToast();
  const navigate = useNavigate();
  const [knowledgeList, setKnowledgeList] = useState<KbItemType[]>([]);
  const [searchText, setSearchText] = useState("");

  const fetchKbList = async () => {
    const res = await getKbList();
    setKnowledgeList(res);
  };

  useEffect(() => {
    fetchKbList();
  }, []);

  const knowledgeLists = useMemo(
    () => knowledgeList.filter((item) => new RegExp(searchText, 'ig').test(item.name + item.tags)),
    [knowledgeList, searchText]
  );


  const handleCreateModel = useCallback(async () => {
    const name = `知识库${knowledgeList.length + 1}`;
    const id = await postCreateKb({ name });
    fetchKbList();
    toast({
      title: "创建成功",
      status: "success",
    });
    navigate(`${Path.Knowledge}?kbId=${id}`);
  }, [knowledgeList]);

  return (
    <ChakraProvider theme={theme}>
      <Flex
        position={"relative"}
        flexDirection={"column"}
        w={"100%"}
        h={"100%"}
        bg={"white"}
        borderRight={["", theme.borders.base]}
      >
        <Flex w={"90%"} my={5} mx={"auto"}>
          <Flex flex={1} mr={2} position={"relative"} alignItems={"center"}>
            <Input
              h={"32px"}
              placeholder="搜索知识库"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <Icon
                as={require("../icons/close.svg").default}
                color={"#ccc"}
                position="absolute"
                right={3}
                zIndex={10}
                onClick={() => setSearchText("")}
                cursor={"pointer"}
              />
            )}
          </Flex>
          <Tooltip label={"新建一个知识库"}>
            <IconButton
              h={"32px"}
              icon={<AddIcon />}
              aria-label={""}
              variant={"base"}
              onClick={handleCreateModel}
            />
          </Tooltip>
        </Flex>
        <Box
          flex={"1 0 0"}
          h={0}
          pl={[0, 2]}
          overflowY={"scroll"}
          userSelect={"none"}
        >
          <>
            {knowledgeLists.length > 0 && (
              <>
                {knowledgeLists.map((item) => (
                  <Flex
                    key={item._id}
                    position={"relative"}
                    alignItems={["flex-start", "center"]}
                    p={3}
                    mb={[2, 0]}
                    cursor={"pointer"}
                    transition={"background-color .2s ease-in"}
                    borderRadius={["", "md"]}
                    borderBottom={["1px solid #f4f4f4", "none"]}
                    _hover={{
                      backgroundImage: ["", theme.lgColor.hoverBlueGradient],
                    }}
                    {...(kbId === item._id
                      ? {
                          backgroundImage: `${theme.lgColor.activeBlueGradient} !important`,
                        }
                      : {})}
                    onClick={() => {
                      if (item._id === kbId) return;
                      navigate(`${Path.Knowledge}?kbId=${item?._id}`);
                    }}
                  >
                    <Avatar avatar={item.avatar} />
                    <Box flex={"1 0 0"} w={0} ml={3}>
                      <Box className="textEllipsis" color={"myGray.1000"}>
                        {item.name}
                      </Box>
                      <Box color={"myGray.400"} py={1} fontSize={"sm"}>
                        {item.tags ? (
                          <>
                            {item?.tags?.split(" ").map((tag, i) => (
                              <Tag key={i} mr={1} mb={1}>
                                {tag}
                              </Tag>
                            ))}
                          </>
                        ) : (
                          <>你还没设置标签</>
                        )}
                      </Box>
                    </Box>
                  </Flex>
                ))}
              </>
            )}
          </>

          {knowledgeLists?.length === 0 && (
            <Flex
              h={"100%"}
              flexDirection={"column"}
              alignItems={"center"}
              pt={"30vh"}
            >
              <Icon
                as={require("../icons/empty.svg").default}
                w={"48px"}
                h={"48px"}
                color={"transparent"}
              />
              <Box mt={2} color={"myGray.500"}>
                知识库空空如也~
              </Box>
            </Flex>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
