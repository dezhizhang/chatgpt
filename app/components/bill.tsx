/*
 * :file description:
 * :name: /chatgpt/app/components/bill.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-20 15:05:53
 * :last editor: 张德志
 * :date last edited: 2023-08-20 20:52:03
 */

import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Box,
  Icon,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { BillTypeMap } from "../constant";
import type { UserBillType } from "../typing";
import { getUserBills } from "../api/user";
import { addDays } from "date-fns";

export function Bill() {
  const [bills, setBills] = useState<UserBillType[]>([]);
  const [pagination, setPagination] = useState<{
    total: number;
    pageSize: number;
    pageNum: number;
  }>();
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const fetchUserBills = async () => {
    const res = await getUserBills({
      pageNum: 1,
      pageSize: 10,
      dateStart: dateRange.from,
      dateEnd: dateRange.to,
    });
    const { data, total, pageNum, pageSize } = res || {};
    setBills(data);
    setPagination({
      total: total as number,
      pageSize,
      pageNum,
    });
  };

  useEffect(() => {
    fetchUserBills();
  }, []);

  const { total, pageSize, pageNum } = pagination || {};

  return (
    <div>
      <TableContainer position={"relative"} minH={"100px"} overflowY={"scroll"}>
        <Table>
          <Thead>
            <Tr>
              <Th>时间</Th>
              <Th>类型</Th>
              <Th>模型</Th>
              <Th>内容长度</Th>
              <Th>Tokens 长度</Th>
              <Th>金额</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={"sm"}>
            {bills?.length > 0 ? (
              <>
                {(bills || []).map((item) => (
                  <Tr key={item.id}>
                    <Td>{dayjs(item.time).format("YYYY/MM/DD HH:mm:ss")}</Td>
                    <Td>{(BillTypeMap as any)[item?.type as string] || "-"}</Td>
                    <Td>{item.modelName}</Td>
                    <Td>{item.textLen}</Td>
                    <Td>{item.tokenLen}</Td>
                    <Td>{item.price}元</Td>
                  </Tr>
                ))}
              </>
            ) : null}
          </Tbody>
        </Table>
      </TableContainer>

      {bills?.length === 0 && (
        <Flex h={"100%"} flexDirection={"column"} alignItems={"center"}>
          <Icon
            as={require("../icons/empty.svg").default}
            name="empty"
            w={"48px"}
            h={"48px"}
            color={"transparent"}
          />
          <Box mt={2} color={"myGray.500"}>
            无使用记录~
          </Box>
        </Flex>
      )}
      {(total as number) > (pageSize as number) && (
        <Flex w={"100%"} mt={4} justifyContent={"flex-end"}>
          {/* <DateRangePicker
          defaultDate={dateRange}
          position="top"
          onChange={setDateRange}
          // onSuccess={() => getData(1)}
        /> */}
          <Box ml={2}>{/* <Pagination /> */}</Box>
        </Flex>
      )}
    </div>
  );
}
