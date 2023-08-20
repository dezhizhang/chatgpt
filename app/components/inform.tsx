/*
 * :file description:
 * :name: /chatgpt/app/components/inform.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-20 16:48:58
 * :last editor: 张德志
 * :date last edited: 2023-08-20 22:02:22
 */
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ChakraProvider,
} from "@chakra-ui/react";
import { theme } from "../theme";
import { getInforms,readInform } from "../api/user";
import { formatTimeToChatTime } from "../utils/index";
import { UserinformType } from "../typing";

export function Inform() {
  const [informs, setInforms] = useState<UserinformType[]>([]);

  const fetchInforms = async (pageNum:number = 1) => {
    const res = await getInforms({ pageNum: pageNum, pageSize: 10 });
    const { data, total } = res || {};
    setInforms(data);
  };

  useEffect(() => {
    fetchInforms();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box mt={2}>
        <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
          {informs?.length > 0 ? (
            <>
              {informs.map((item) => (
                <AccordionItem
                  key={item._id}
                  onClick={async () => {
                    if (!item.read) {
                      await readInform(item._id);
                      fetchInforms(1);
                    }
                  }}
                >
                  <AccordionButton>
                    <Flex alignItems={"center"} flex="1" textAlign="left">
                      <Box fontWeight={"bold"} position={"relative"}>
                        {!item.read && (
                          <Box
                            w={"5px"}
                            h={"5px"}
                            borderRadius={"10px"}
                            bg={"myRead.600"}
                            position={"absolute"}
                            top={1}
                            left={"-5px"}
                          ></Box>
                        )}
                        {item.title}
                      </Box>
                      <Box ml={2} color={"myGray.500"}>
                        {formatTimeToChatTime(item.time)}
                      </Box>
                    </Flex>

                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>{item.content}</AccordionPanel>
                </AccordionItem>
              ))}
            </>
          ) : null}
        </Accordion>
        {informs?.length === 0 && (
          <Flex
            h={"100%"}
            flexDirection={"column"}
            alignItems={"center"}
            pt={"100px"}
          >
            <Icon
              as={require("../icons/empty.svg").default}
              name="empty"
              w={"48px"}
              h={"48px"}
              color={"transparent"}
            />
            <Box mt={2} color={"myGray.500"}>
              暂无通知~
            </Box>
          </Flex>
        )}
        {/* {total > pageSize && (
        <Flex w={"100%"} mt={4} justifyContent={"flex-end"}>
          <Pagination />
        </Flex>
      )} */}
      </Box>
    </ChakraProvider>
  );
}
