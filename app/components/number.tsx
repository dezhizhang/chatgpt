/*
 * :file description:
 * :name: /chatgpt/app/components/number.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-20 13:55:36
 * :last editor: 张德志
 * :date last edited: 2023-08-20 14:34:38
 */
import React, { useCallback, useRef, useState, useEffect } from "react";
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
import WithdrawIcon from "../icons/withdraw.svg";
import { Avatar } from "./emoji";
import { useAccessStore, useAppConfig } from "../store";
import { getPromotionInitData } from "../api/user";
import { theme } from "../theme";
import { useForm } from "react-hook-form";

export function Number() {
  const userInfo = useAccessStore();
  const config = useAppConfig();

  const [promotion, setPromotion] = useState<{
    historyAmount: number;
    invitedAmount: number;
    residueAmount: number;
  }>();

  const fetchgPromotionInitData = async () => {
    const res = await getPromotionInitData();
    setPromotion({ ...res });
  };

  useEffect(() => {
    fetchgPromotionInitData();
  }, []);

  const {historyAmount,invitedAmount,residueAmount} = promotion || {};

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
            leftIcon={<WithdrawIcon style={{fontSize:'22px'}}/>}
            px={4}
            title={(residueAmount as number) < 50 ? '最低提现额度为50元' : ''}
            isDisabled={(residueAmount as number) < 50}
            variant={'base'}
            colorScheme={'myBlue'}
            // onClick={onOpenWxConcat}
            >
              {(residueAmount as number) < 50 ? '50元起提' : '提现'}
            </Button>
          </Card>
        </Grid>

        <Card mt={4} px={[3, 6]} py={4}>
          {/* <Tabs
                m={'auto'}
                w={'200px'}
                list={tableList.current}
                activeId={tableType}
                size={'sm'}
                onChange={(id: any) => router.replace(`/number?type=${id}`)}
            /> */}
          <Box minH={"300px"}>
            {/* {(() => {
                    const item = tableList.current.find((item) => item.id === tableType);

                    return item ? item.Component : null;
                })()} */}
          </Box>
        </Card>

        {/* {isOpenPayModal && <PayModal onClose={onClosePayModal} />}
        {isOpenWxConcat && <WxConcat onClose={onCloseWxConcat} />}
        <File onSelect={onSelectFile} /> */}
      </Box>
    </ChakraProvider>
  );
}
