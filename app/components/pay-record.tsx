/*
 * :file description:
 * :name: /chatgpt/app/components/pay-record.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-20 15:56:35
 * :last editor: 张德志
 * :date last edited: 2023-08-20 20:48:40
 */
import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Box,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useToast } from "../hooks/useToast";
import { formatPrice } from "../utils/index";
import { UserPayType } from "../typing";
import { getPayOrders, checkPayResult } from "../api/user";

export function PayRecord() {
  const { toast } = useToast();
  const [payOrders, setPayOrders] = useState<UserPayType[]>([]);

  const handleRefreshPayOrder = useCallback(async (payId: string) => {
    const data = await checkPayResult(payId);
    toast({
      title: data,
      status: "info",
    });
    const res = await getPayOrders();
    setPayOrders(res);
  }, []);

  const fetchPayOrders = async () => {
    const res = await getPayOrders();
    setPayOrders(res || []);
  };

  useEffect(() => {
    fetchPayOrders();
  }, []);
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>订单号</Th>
              <Th>时间</Th>
              <Th>金额</Th>
              <Th>状态</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody fontSize={"sm"}>
            {payOrders.length > 0 ? (
              <>
                {(payOrders || []).map((item) => (
                  <Tr key={item._id}>
                    <Td>{item.orderId}</Td>
                    <Td>
                      {item.createTime
                        ? dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss")
                        : "-"}
                    </Td>
                    <Td>{formatPrice(item.price)}元</Td>
                    <Td>{item.status}</Td>
                    <Td>
                      {item.status === "NOTPAY" && (
                        <Button
                          onClick={() => handleRefreshPayOrder(item._id)}
                          size={"sm"}
                        >
                          更新
                        </Button>
                      )}
                    </Td>
                  </Tr>
                ))}
              </>
            ) : null}
          </Tbody>
        </Table>
      </TableContainer>
      {/* {payOrders.length === 0 && (
      <Flex h={'100%'} flexDirection={'column'} alignItems={'center'} pt={'100px'}>
        <MyIcon name="empty" w={'48px'} h={'48px'} color={'transparent'} />
        <Box mt={2} color={'myGray.500'}>
          无支付记录~
        </Box>
      </Flex>
    )} */}
    </>
  );
}
