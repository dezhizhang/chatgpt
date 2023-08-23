/*
 * :file description: 探索测试
 * :name: /chatgpt/app/components/exploratory-testing.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-24 04:15:55
 * :last editor: 张德志
 * :date last edited: 2023-08-24 05:31:23
 */
import qs from "qs";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Textarea,
  Button,
  Flex,
  useTheme,
  Grid,
  Progress,
  ChakraProvider,
  Icon,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { searchText } from "../api/knowledge";
import BotIcon from "../icons/bot.svg";
import LoadingIcon from "../icons/three-dots.svg";
import { theme } from "../theme";
import dynamic from "next/dynamic";
import { formatTimeToChatTime } from "../utils/index";
import { useKbStore } from "../store/knowledge";
import styles from "./knowledge.module.scss";
import type { FormData, KbTestItemType } from "../typing";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 12);

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

const InputModal = dynamic(
  async () => (await import("./input-modal")).InputModal,
  {
    loading: () => <LoadingIcon />,
  },
);

export function ExploratoryTesting() {
  const location = useLocation();
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editData, setEditData] = useState<FormData>();
  const [kbTestItem, setKbTestItem] = useState<KbTestItemType>();
  const { kbTestList, pushKbTestItem, delKbTestItemById, updateKbItemById } =
    useKbStore();

  const urlParse: any = qs.parse(location?.search?.split("?")?.[1]);
  const { kbId } = urlParse || {};

  const handleTest = async () => {
    const res = await searchText({ kbId, text: inputText.trim() });
    const testItem = {
      id: nanoid(),
      kbId,
      text: inputText.trim(),
      time: new Date(),
      results: res,
    };
    pushKbTestItem(testItem);
    setInputText("");
    setKbTestItem(testItem);
  };

  const kbTestHistory = useMemo(
    () => kbTestList.filter((item) => item.kbId === kbId),
    [kbId, kbTestList],
  );

  console.log(kbTestHistory);

  return (
    <ChakraProvider theme={theme}>
      <Box h={"100%"} display={["block", "flex"]}>
        <Box
          h={["auto", "100%"]}
          overflow={"overlay"}
          flex={1}
          maxW={"500px"}
          px={4}
          borderRight={["none", theme.borders.base]}
        >
          <Box
            border={"2px solid"}
            borderColor={"myBlue.600"}
            p={3}
            borderRadius={"md"}
          >
            <Box fontSize={"sm"} fontWeight={"bold"}>
              {/* <MyIcon
                mr={2}
                name={"text"}
                w={"18px"}
                h={"18px"}
                color={"myBlue.700"}
              /> */}
              测试文本
            </Box>
            <Textarea
              rows={6}
              resize={"none"}
              variant={"unstyled"}
              maxLength={1000}
              placeholder="输入需要测试的文本"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Flex justifyContent={"flex-end"}>
              <Button
                isDisabled={inputText === ""}
                isLoading={isLoading}
                onClick={handleTest}
              >
                测试
              </Button>
            </Flex>
          </Box>
          <Box mt={5} display={["none", "block"]}>
            <Flex alignItems={"center"} color={"myGray.600"}>
              {/* <MyIcon mr={2} name={"history"} w={"16px"} h={"16px"} /> */}
              <Box fontSize={"2xl"}>测试历史</Box>
            </Flex>
            <Box mt={2}>
              <Flex
                py={1}
                fontWeight={"bold"}
                borderBottom={theme.borders.base}
              >
                <Box flex={1}>测试文本</Box>
                <Box w={"80px"}>时间</Box>
                <Box w={"14px"}></Box>
              </Flex>
              {kbTestHistory.map((item) => (
                <Flex
                  key={item.id}
                  p={1}
                  alignItems={"center"}
                  borderBottom={theme.borders.base}
                  _hover={{
                    bg: "#f4f4f4",
                    "& .delete": {
                      display: "block",
                    },
                  }}
                  cursor={"pointer"}
                  onClick={() => setKbTestItem(item)}
                >
                  <Box flex={1} mr={2}>
                    {item.text}
                  </Box>
                  <Box w={"80px"}>{formatTimeToChatTime(item.time)}</Box>
                  <Box w={"14px"} h={"14px"}>
                    <Icon
                      as={require("../icons/delete.svg").default}
                      className="delete"
                      name={"delete"}
                      w={"14px"}
                      display={"none"}
                      _hover={{ color: "red.600" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        delKbTestItemById(item.id);
                        kbTestItem?.id === item.id && setKbTestItem(undefined);
                      }}
                    />
                  </Box>
                </Flex>
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          px={4}
          pb={4}
          mt={[8, 0]}
          h={["auto", "100%"]}
          overflow={"overlay"}
          flex={1}
        >
          {kbTestItem?.results ? (
            <>
              <Flex alignItems={"flex-end"}>
                <Box fontSize={"3xl"} color={"myGray.600"}>
                  测试结果
                </Box>
                <Box fontSize={"xs"} color={"myGray.500"} ml={1}>
                  QA内容可能不是最新
                </Box>
              </Flex>
              <Grid
                mt={1}
                gridTemplateColumns={[
                  "repeat(1,1fr)",
                  "repeat(1,1fr)",
                  "repeat(1,1fr)",
                  "repeat(2,1fr)",
                ]}
                gridGap={4}
              >
                {kbTestItem?.results.map((item) => (
                  <Box
                    key={item.id}
                    pb={2}
                    borderRadius={"sm"}
                    border={theme.borders.base}
                    _notLast={{ mb: 2 }}
                    cursor={"pointer"}
                    title={"编辑"}
                    // onClick={async () => {
                    //   try {
                    //     setLoading(true);
                    //     const data = await getKbDataItemById(item.id);

                    //     if (!data) {
                    //       throw new Error("该数据已被删除");
                    //     }

                    //     setEditData({
                    //       dataId: data.id,
                    //       q: data.q,
                    //       a: data.a,
                    //     });
                    //   } catch (err) {
                    //     toast({
                    //       status: "warning",
                    //       title: getErrText(err),
                    //     });
                    //   }
                    //   setLoading(false);
                    // }}
                  >
                    <Flex p={3} alignItems={"center"} color={"myGray.500"}>
                      {/* <MyIcon name={"kbTest"} w={"14px"} /> */}
                      <Progress
                        mx={2}
                        flex={1}
                        value={item.score * 100}
                        size="sm"
                        borderRadius={"20px"}
                        colorScheme="gray"
                      />
                      <Box>{item.score.toFixed(4)}</Box>
                    </Flex>
                    <Box
                      px={2}
                      fontSize={"xs"}
                      color={"myGray.600"}
                      maxH={"200px"}
                      overflow={"overlay"}
                    >
                      <Box>{item.q}</Box>
                      <Box>{item.a}</Box>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </>
          ) : (
            <Flex
              mt={[10, 0]}
              h={"100%"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Icon
                as={require("../icons/empty.svg").default}
                w={"48px"}
                h={"48px"}
                color={"transparent"}
              />
              <Box mt={3} color={"myGray.600"}>
                测试结果将在这里展示
              </Box>
            </Flex>
          )}
        </Box>

        {editData && (
          <InputModal
            kbId={kbId}
            defaultValues={editData}
            onClose={() => setEditData(undefined)}
            onSuccess={function (data: FormData): void {
              throw new Error("Function not implemented.");
            }} // onSuccess={(data) => {
            //   if (kbTestItem && editData.dataId) {
            //     const newTestItem = {
            //       ...kbTestItem,
            //       results: kbTestItem.results.map((item) =>
            //         item.id === editData.dataId
            //           ? {
            //               ...item,
            //               q: data.q,
            //               a: data.a,
            //             }
            //           : item,
            //       ),
            //     };
            //     updateKbItemById(newTestItem);
            //     setKbTestItem(newTestItem);
            //   }

            //   setEditData(undefined);
            // }}
            // onDelete={() => {
            //   if (kbTestItem && editData.dataId) {
            //     const newTestItem = {
            //       ...kbTestItem,
            //       results: kbTestItem.results.filter(
            //         (item) => item.id !== editData.dataId,
            //       ),
            //     };
            //     updateKbItemById(newTestItem);
            //     setKbTestItem(newTestItem);
            //   }
            //   setEditData(undefined);
            // }}
          />
        )}
      </Box>
    </ChakraProvider>
  );
}
