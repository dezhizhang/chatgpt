/*
 * :file description:
 * :name: /chatgpt/app/components/login.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-11 05:21:09
 * :last editor: 张德志
 * :date last edited: 2023-08-13 16:07:59
 */
import styles from "./login.module.scss";
import { useState, useCallback } from "react";
import { Box, Flex, Image, ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { theme } from "../theme";
import { PageTypeEnum } from "../constant";
import { useAccessStore } from "../store";
import { LoginForm } from "./loginForm";
export function LoginPage() {
  const isPc = true;
  const navigate = useNavigate();
  const access = useAccessStore();

  const [pageType, setPageType] = useState<`${PageTypeEnum}`>(
    PageTypeEnum.login,
  );

  const goHome = () => navigate(Path.Home);

  const loginSuccess = useCallback(() => { }, []);

  function DynamicComponent({ type }: { type: `${PageTypeEnum}` }) {
    const TypeMap = {
      [PageTypeEnum.login]: LoginForm,
      [PageTypeEnum.register]: LoginForm,
      [PageTypeEnum.forgetPassword]: LoginForm,
    };

    const Component = TypeMap[type];

    return <Component />;
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        className={styles["login-page"]}
        h={"100%"}
        px={[0, "10vw"]}
      >
        <Flex
          height="100%"
          w={"100%"}
          maxW={"1240px"}
          maxH={["auto", "max(660px,80vh)"]}
          backgroundColor={"#fff"}
          alignItems={"center"}
          justifyContent={"center"}
          py={[5, 10]}
          px={"5vw"}
          borderRadius={isPc ? "md" : "none"}
          gap={5}
        >
          <Image
            src={'https://fastgpt.run/icon/loginLeft.svg'}
            // order={pageType === PageTypeEnum.login ? 0 : 2}
            flex={"1 0 0"}
            w="0"
            maxW={"600px"}
            height={"100%"}
            maxH={"450px"}
            alt=""
          />

          <Box
            order={1}
            flex={`0 0 ${isPc ? "400px" : "100%"}`}
            height={"100%"}
            border="1px"
            borderColor="gray.200"
            py={5}
            px={10}
            borderRadius={isPc ? "md" : "none"}
          >
            <DynamicComponent type={pageType} />
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
