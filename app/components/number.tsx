/*
 * :file description:
 * :name: /chatgpt/app/components/number.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-20 13:55:36
 * :last editor: 张德志
 * :date last edited: 2023-08-20 15:58:34
 */
import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  Box,
  Flex,
  Button,
  Input,
  Grid,
  useDisclosure,
  ChakraProvider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import WithdrawIcon from "../icons/withdraw.svg";
import { Avatar } from "./emoji";
import { Tabs } from "./tabs";
import BotIcon from "../icons/bot.svg";
import LoadingIcon from "../icons/three-dots.svg";
import dynamic from "next/dynamic";
import { useAccessStore, useAppConfig } from "../store";
import { getPromotionInitData } from "../api/user";
import { useCopyData } from "../utils/index";
import { theme } from "../theme";
import styles from "./number.module.scss";
import { useForm } from "react-hook-form";
import { Path } from "../constant";

enum TableEnum {
  "bill" = "bill",
  "pay" = "pay",
  "promotion" = "promotion",
  "inform" = "inform",
}

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

const Bill = dynamic(async () => (await import("./bill")).Bill, {
  loading: () => <Loading noLogo />,
});

const PayRecord = dynamic(
  async () => (await import("./pay-record")).PayRecord,
  {
    loading: () => <Loading noLogo />,
  },
);

export function Number() {
  const navigate = useNavigate();
  console.log(navigate);
  const { copyData } = useCopyData();
  const userInfo = useAccessStore();
  const config = useAppConfig();
  const [tableType, setTableType] = useState<string>(TableEnum.bill);

  const {
    isOpen: isOpenWxConcat,
    onClose: onCloseWxConcat,
    onOpen: onOpenWxConcat,
  } = useDisclosure();

  const [promotion, setPromotion] = useState<{
    historyAmount: number;
    invitedAmount: number;
    residueAmount: number;
  }>();
  const tableList = useRef<any>([
    {
      label: "账单",
      id: TableEnum.bill,
      Component: <Bill />,
    },
    {
      label: "充值",
      id: TableEnum.pay,
      Component: <PayRecord />,
    },
    {
      label: "佣金",
      id: TableEnum.promotion,
      //  Component: <PromotionTable />
    },
    {
      label: "通知",
      id: TableEnum.inform,
      //  Component: <InformTable />
    },
  ]);

  const fetchgPromotionInitData = async () => {
    const res = await getPromotionInitData();
    setPromotion({ ...res });
  };

  useEffect(() => {
    fetchgPromotionInitData();
  }, []);

  const { historyAmount, invitedAmount, residueAmount } = promotion || {};

  return (
    <ChakraProvider theme={theme}>
      <Box py={[5, 10]} style={{ padding: "16px" }}>
        <Grid gridTemplateColumns={["1fr", "3fr 300px"]} gridGap={4}>
          <Card px={6} py={4}>
            <Flex justifyContent={"space-between"}>
              <Box fontSize={"xl"} fontWeight={"bold"}>
                账号信息
              </Box>
              <Button
                variant={"base"}
                size={"xs"}

                // onClick={onclickLogOut}
              >
                退出登录
              </Button>
            </Flex>
            <Flex mt={6} alignItems={"center"}>
              <Box flex={"0 0 50px"}>头像:</Box>
              <Avatar avatar={config.avatar} />
            </Flex>
            <Flex mt={6} alignItems={"center"}>
              <Box flex={"0 0 50px"}>账号:</Box>
              <Box>{userInfo?.username}</Box>
            </Flex>
            <Box mt={6}>
              <Flex alignItems={"center"}>
                <Box flex={"0 0 50px"}>余额:</Box>
                <Box>
                  <strong>{userInfo?.balance}</strong> 元
                </Box>
                <Button
                  size={["xs", "sm"]}
                  w={["70px", "80px"]}
                  ml={5}

                  // onClick={onOpenPayModal}
                >
                  充值
                </Button>
              </Flex>
              <Box fontSize={"xs"} color={"blackAlpha.500"}>
                如果填写了自己的 openai 账号，网页上 openai 模型对话不会计费。
              </Box>
            </Box>
          </Card>
          <Card px={6} py={4}>
            <Box fontSize={"xl"} fontWeight={"bold"}>
              我的邀请
            </Box>
            {[
              {
                label: "佣金比例",
                value: `${userInfo?.promotion?.rate || 15}%`,
              },
              { label: "已注册用户数", value: `${invitedAmount}人` },
              { label: "累计佣金", value: `￥${historyAmount}` },
              { label: "可用佣金", value: `￥${residueAmount}` },
            ].map((item) => (
              <Flex
                key={item.label}
                alignItems={"center"}
                mt={4}
                justifyContent={"space-between"}
              >
                <Box w={"120px"}>{item.label}</Box>
                <Box fontWeight={"bold"}>{item.value}</Box>
              </Flex>
            ))}
            <Button
              mt={4}
              variant={"base"}
              w={"100%"}
              onClick={() =>
                copyData(
                  `${location.origin}/?inviterId=${userInfo?._id}`,
                  "已复制邀请链接",
                )
              }
            >
              复制邀请链接
            </Button>
            <Button
              mt={4}
              leftIcon={<WithdrawIcon style={{ fontSize: "22px" }} />}
              px={4}
              title={(residueAmount as number) < 50 ? "最低提现额度为50元" : ""}
              isDisabled={(residueAmount as number) < 50}
              variant={"base"}
              colorScheme={"myBlue"}
              onClick={onOpenWxConcat}
            >
              {(residueAmount as number) < 50 ? "50元起提" : "提现"}
            </Button>
          </Card>
        </Grid>

        <Card mt={4} px={[3, 6]} py={4}>
          <Tabs
            m={"auto"}
            w={"200px"}
            activeId={tableType}
            size={"sm"}
            list={tableList.current as any}
            onChange={(id: string) => {
              setTableType(id);
              navigate(`${Path.Number}?type=${id}`);
            }}
          />
          <Box minH={"300px"}>
            {(tableList.current || []).map((item: any) => {
              return item.id === tableType ? item?.Component : null;
            })}
          </Box>
        </Card>

        {/* {isOpenPayModal && <PayModal onClose={onClosePayModal} />}
        {isOpenWxConcat && <WxConcat onClose={onCloseWxConcat} />}
        <File onSelect={onSelectFile} /> */}
      </Box>
    </ChakraProvider>
  );
}
