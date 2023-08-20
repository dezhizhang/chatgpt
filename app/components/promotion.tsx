/*
 * :file description:
 * :name: /chatgpt/app/components/promotion.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-20 16:20:36
 * :last editor: 张德志
 * :date last edited: 2023-08-20 16:44:16
 */
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import type { UserromotionType } from "../typing";
import { getPromotionRecords } from '../api/user';
import { PromotionTypeMap } from "../constant";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Icon,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";

export function Promotion() {
  const [promotions, setPromotions] = useState<UserromotionType[]>([]);
  const fetchPromotionRecords = async () => {
    const res = await getPromotionRecords({
      pageNum: 1,
      pageSize: 10,
    });
    const { data } = res || {}
    setPromotions(data);
  }
  useEffect(() => {
    fetchPromotionRecords();
  }, [])

  return (
    <>
      <TableContainer position={"relative"} overflow={"hidden"} minH={"100px"}>
        <Table>
          <Thead>
            <Tr>
              <Th>时间</Th>
              <Th>类型</Th>
              <Th>金额</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={"sm"}>
            {(promotions || []).map((item) => (
              <Tr key={item._id}>
                <Td>
                  {item.createTime
                    ? dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss")
                    : "-"}
                </Td>
                <Td>{(PromotionTypeMap as any)[item.type]}</Td>
                <Td>{item.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {promotions.length === 0 && (
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Icon as={require('../icons/empty.svg').default} w={'48px'} h={'48px'} color={'transparent'} />
          <Box mt={2} color={"myGray.500"}>
            无佣金记录~
          </Box>
        </Flex>
      )}
    </>
  );
}
