/*
 * :file description:
 * :name: /chatgpt/app/components/tag.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-21 22:37:57
 * :last editor: 张德志
 * :date last edited: 2023-08-21 22:45:32
 */
import React, { useMemo } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";
interface Props extends BoxProps {
  children: string;
  colorSchema?: "blue" | "green" | "gray";
}
export function Tag({ children, colorSchema = "blue", ...props }: Props) {
  const theme = useMemo(() => {
    const map = {
      blue: {
        borderColor: "myBlue.700",
        bg: "#F2FBFF",
        color: "myBlue.700",
      },
      green: {
        borderColor: "#52C41A",
        bg: "#EDFFED",
        color: "#52C41A",
      },
      gray: {
        borderColor: "#979797",
        bg: "#F7F7F7",
        color: "#979797",
      },
    };
    return map[colorSchema];
  }, [colorSchema]);
  return (
    <Box
      display={"inline-block"}
      border={"1px solid"}
      px={2}
      lineHeight={1}
      py={"2px"}
      borderRadius={"md"}
      fontSize={"xs"}
      {...theme}
      {...props}
    >
      {children}
    </Box>
  );
}
